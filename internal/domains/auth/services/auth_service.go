package services

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"time"

	"management_system/internal/domains/auth/interfaces"
	"management_system/internal/domains/auth/types"
	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
	"management_system/internal/repository/mongodb"
	autil "management_system/internal/util/auth"
)

type authService struct {
	users  repoif.UserRepository
	tokens mongodb.RefreshTokenRepository
	base   repoif.BaseRepository[model.RefreshToken]
}

func NewAuthService(users repoif.UserRepository, tokens mongodb.RefreshTokenRepository) interfaces.AuthService {
	return &authService{users: users, tokens: tokens}
}

func (s *authService) Login(ctx context.Context, req types.LoginRequest) (types.TokenPair, error) {
	u, err := s.users.GetByUsername(ctx, req.Username)
	if err != nil {
		return types.TokenPair{}, err
	}
	if u.Status != "active" {
		return types.TokenPair{}, errors.New("user inactive")
	}
	if !autil.CheckPassword(u.PasswordHash, req.Password) {
		return types.TokenPair{}, errors.New("invalid credentials")
	}
	// TODO: Build roles/permissions from user's roles via UserRole collection
	var roleNames []string
	var perms []string
	// Note: Need to fetch user roles from UserRole collection separately
	access, err := autil.GenerateAccessToken(u.ID.Hex(), roleNames, perms, 15*time.Minute)
	if err != nil {
		return types.TokenPair{}, err
	}
	// Refresh token (random, store hash)
	raw := u.ID.Hex() + time.Now().String()
	h := sha256.Sum256([]byte(raw))
	refreshPlain := hex.EncodeToString(h[:])
	rt := model.RefreshToken{
		UserID:    u.ID,
		TokenHash: refreshPlain, // simplified; in real, hash again
		DeviceInfo: model.DeviceInfo{
			DeviceID:   "unknown",
			DeviceName: "unknown",
			Platform:   "web",
			UserAgent:  "unknown",
		},
		Location: model.TokenLocation{
			IPAddress: "unknown",
			Country:   "unknown",
			City:      "unknown",
		},
		ExpiresAt: time.Now().Add(30 * 24 * time.Hour),
		IsRevoked: false,
		Metadata: model.RefreshTokenMetadata{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	if err := s.tokens.Create(ctx, rt); err != nil {
		return types.TokenPair{}, err
	}
	return types.TokenPair{AccessToken: access, RefreshToken: refreshPlain}, nil
}

func (s *authService) Refresh(ctx context.Context, refreshToken string) (types.TokenPair, error) {
	t, err := s.tokens.FindActiveByHash(ctx, refreshToken)
	if err != nil {
		return types.TokenPair{}, err
	}
	if time.Now().After(t.ExpiresAt) || t.IsRevoked {
		return types.TokenPair{}, errors.New("refresh expired")
	}
	// Access token
	access, err := autil.GenerateAccessToken(t.UserID.Hex(), nil, nil, 15*time.Minute)
	if err != nil {
		return types.TokenPair{}, err
	}
	return types.TokenPair{AccessToken: access, RefreshToken: refreshToken}, nil
}

func (s *authService) Logout(ctx context.Context, refreshToken string) error {
	return s.tokens.RevokeByHash(ctx, refreshToken)
}

func (s *authService) Register(ctx context.Context, req types.RegisterRequest) error {
	// This is a simple registration for basic auth
	// For full user creation with all details, use UserService.CreateUser
	
	if req.Username == "" || req.Password == "" || req.FullName == "" {
		return errors.New("missing required fields")
	}
	
	hash, err := autil.HashPassword(req.Password)
	if err != nil {
		return err
	}
	
	// No need to parse name since User model is simplified
	
	// Create minimal user for authentication only
	u := model.User{
		ID:           model.NewUUID(),
		Username:     req.Username,
		Email:        *req.Email,
		PasswordHash: hash,
		Role:         "user", // Default role
		Status:       "active",
		LastLoginAt:  nil,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}
	
	return s.users.Create(ctx, u)
}
