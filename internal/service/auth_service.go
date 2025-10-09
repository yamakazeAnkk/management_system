package service

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"strings"
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
	if !u.Status.IsActive {
		return sif.TokenPair{}, errors.New("user inactive")
	}
	if !autil.CheckPassword(u.PasswordHash, in.Password) {
		return sif.TokenPair{}, errors.New("invalid credentials")
	}
	// TODO: Build roles/permissions from user's roles via UserRole collection
	var roleNames []string
	var perms []string
	// Note: Need to fetch user roles from UserRole collection separately
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
	// This is a simple registration for basic auth
	// For full user creation with all details, use UserService.CreateUser
	
	if in.Username == "" || in.Password == "" || in.FullName == "" {
		return errors.New("missing required fields")
	}
	
	hash, err := autil.HashPassword(in.Password)
	if err != nil {
		return err
	}
	
	// Parse FullName to FirstName and LastName
	nameParts := strings.Fields(in.FullName)
	firstName := ""
	lastName := ""
	if len(nameParts) > 0 {
		firstName = nameParts[0]
		if len(nameParts) > 1 {
			lastName = strings.Join(nameParts[1:], " ")
		}
	}
	
	// Create minimal user for basic auth
	u := model.User{
		ID:           model.NewUUID(),
		EmployeeID:   "EMP" + model.NewUUID().Hex()[:6], // Generate Employee ID
		Username:     in.Username,
		PasswordHash: hash,
		PersonalInfo: model.PersonalInfo{
			FirstName: firstName,
			LastName:  lastName,
			FullName:  in.FullName,
			Email:     *in.Email,
			Address: model.Address{
				Street:     "",
				City:       "",
				State:      "",
				Country:    "",
				PostalCode: "",
			},
		},
		EmploymentInfo: model.EmploymentInfo{
			Position:       "",
			JobTitle:       "",
			EmploymentType: "full-time",
			WorkLocation:   "",
			JoinDate:       time.Now(),
			Salary: model.Salary{
				Amount:        0,
				Currency:      "USD",
				Type:          "monthly",
				IsConfidential: false,
			},
			Benefits:      []string{},
			BonusEligible: false,
		},
		ProfessionalInfo: model.ProfessionalInfo{
			Skills:         []string{},
			Certifications: []string{},
			Education:      []model.Education{},
			Languages:      []string{},
		},
		EmergencyContact: model.EmergencyContact{
			Name:         "",
			Relationship: "",
			Phone:        "",
			Email:        "",
		},
		Documents: model.UserDocuments{
			Contracts:    []model.DocumentInfo{},
			Certificates: []model.DocumentInfo{},
			Other:        []model.DocumentInfo{},
		},
		Status: model.UserStatus{
			IsActive: true,
			Status:   "active",
		},
		SecuritySettings: model.SecuritySettings{
			RequireTwoFactor: false,
			LoginAttempts:    0,
		},
		Metadata: model.UserMetadata{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	
	return s.users.Create(ctx, u)
}
