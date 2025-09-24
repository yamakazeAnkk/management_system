package interfaces

import "context"

type LoginInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterInput struct {
	Username string  `json:"username"`
	Password string  `json:"password"`
	FullName string  `json:"fullName"`
	Email    *string `json:"email,omitempty"`
}

type TokenPair struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type AuthService interface {
	Login(ctx context.Context, in LoginInput) (TokenPair, error)
	Refresh(ctx context.Context, refreshToken string) (TokenPair, error)
	Logout(ctx context.Context, refreshToken string) error
	Register(ctx context.Context, in RegisterInput) error
}
