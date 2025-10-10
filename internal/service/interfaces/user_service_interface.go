package interfaces

import (
	"context"

	"management_system/internal/model"
)

// CreateUserRequest represents the input for creating a new user (authentication only)
type CreateUserRequest struct {
	Username string   `json:"username"`
	Email    string   `json:"email"`
	Password string   `json:"password"`
	Role     string   `json:"role"`
}

// UpdateUserRequest represents the input for updating a user (authentication only)
type UpdateUserRequest struct {
	Username *string `json:"username,omitempty"`
	Email    *string `json:"email,omitempty"`
	Role     *string `json:"role,omitempty"`
	Status   *string `json:"status,omitempty"`
}

// UserFilter represents filters for user queries (authentication only)
type UserFilter struct {
	Role   *string `json:"role,omitempty"`
	Status *string `json:"status,omitempty"`
	Search *string `json:"search,omitempty"`
}

// UserService defines the contract for user-related operations (authentication only)
type UserService interface {
	CreateUser(ctx context.Context, req CreateUserRequest) (*model.User, error)
	GetUser(ctx context.Context, id string) (*model.User, error)
	GetUserByUsername(ctx context.Context, username string) (*model.User, error)
	GetUserByEmail(ctx context.Context, email string) (*model.User, error)
	UpdateUser(ctx context.Context, id string, req UpdateUserRequest) (*model.User, error)
	DeleteUser(ctx context.Context, id string) error
	ListUsers(ctx context.Context, filter UserFilter, limit, offset int) ([]*model.User, int64, error)
}
