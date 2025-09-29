package service

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"time"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
	"management_system/internal/repository/mongodb"
	sif "management_system/internal/service/interfaces"
	autil "management_system/internal/util/auth"
)

type authService struct {
	users  repoif.UserRepository
	tokens mongodb.RefreshTokenRepository
	base   repoif.BaseRepository[model.RefreshToken]
}

func NewAuthService(users repoif.UserRepository, tokens mongodb.RefreshTokenRepository) sif.AuthService {
	return &authService{users: users, tokens: tokens}
}

func (s *authService) Login(ctx context.Context, in sif.LoginInput) (sif.TokenPair, error) {
	u, err := s.users.FindByUsername(ctx, in.Username)
	if err != nil {
		return sif.TokenPair{}, err
	}
	if !u.IsActive {
		return sif.TokenPair{}, errors.New("user inactive")
	}
	if !autil.CheckPassword(u.PasswordHash, in.Password) {
		return sif.TokenPair{}, errors.New("invalid credentials")
	}
	// Build roles/permissions from user's roles
	var roleNames []string
	var perms []string
	for _, ur := range u.Roles {
		roleNames = append(roleNames, ur.RoleID.Hex())
	}
	access, err := autil.GenerateAccessToken(u.ID.Hex(), roleNames, perms, 15*time.Minute)
	if err != nil {
		return sif.TokenPair{}, err
	}
	// Refresh token (random, store hash)
	raw := u.ID.Hex() + time.Now().String()
	h := sha256.Sum256([]byte(raw))
	refreshPlain := hex.EncodeToString(h[:])
	rt := model.RefreshToken{
		UserID:    u.ID,
		TokenHash: refreshPlain, // simplified; in real, hash again
		ExpiresAt: time.Now().Add(30 * 24 * time.Hour),
		IsRevoked: false,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	if err := s.tokens.Create(ctx, rt); err != nil {
		return sif.TokenPair{}, err
	}
	return sif.TokenPair{AccessToken: access, RefreshToken: refreshPlain}, nil
}

func (s *authService) Refresh(ctx context.Context, refreshToken string) (sif.TokenPair, error) {
	t, err := s.tokens.FindActiveByHash(ctx, refreshToken)
	if err != nil {
		return sif.TokenPair{}, err
	}
	if time.Now().After(t.ExpiresAt) || t.IsRevoked {
		return sif.TokenPair{}, errors.New("refresh expired")
	}
	// Access token
	access, err := autil.GenerateAccessToken(t.UserID.Hex(), nil, nil, 15*time.Minute)
	if err != nil {
		return sif.TokenPair{}, err
	}
	return sif.TokenPair{AccessToken: access, RefreshToken: refreshToken}, nil
}

func (s *authService) Logout(ctx context.Context, refreshToken string) error {
	return s.tokens.RevokeByHash(ctx, refreshToken)
}

func (s *authService) Register(ctx context.Context, in sif.RegisterInput) error {
	if in.Username == "" || in.Password == "" || in.FullName == "" {
		return errors.New("missing required fields")
	}
	hash, err := autil.HashPassword(in.Password)
	if err != nil {
		return err
	}
	u := model.User{
		ID:           model.NewUUID(),
		Username:     in.Username,
		PasswordHash: hash,
		FullName:     in.FullName,
		Email:        in.Email,
		IsActive:     true,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
		Roles:        []model.UserRole{},
	}
	return s.users.Create(ctx, u)
}
