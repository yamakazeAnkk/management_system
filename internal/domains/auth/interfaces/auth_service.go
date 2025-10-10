package interfaces

import (
	"context"
	"management_system/internal/domains/auth/types"
)

type AuthService interface {
	Login(ctx context.Context, req types.LoginRequest) (types.TokenPair, error)
	Refresh(ctx context.Context, refreshToken string) (types.TokenPair, error)
	Logout(ctx context.Context, refreshToken string) error
	Register(ctx context.Context, req types.RegisterRequest) error
}
