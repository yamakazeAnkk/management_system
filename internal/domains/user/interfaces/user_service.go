package interfaces

import (
	"context"
	"management_system/internal/domains/user/types"
	"management_system/internal/model"
)

type UserService interface {
	CreateUser(ctx context.Context, req types.CreateUserRequest) (*model.User, error)
	GetUser(ctx context.Context, id string) (*model.User, error)
	GetUserByUsername(ctx context.Context, username string) (*model.User, error)
	GetUserByEmployeeID(ctx context.Context, employeeID string) (*model.User, error)
	UpdateUser(ctx context.Context, id string, req types.UpdateUserRequest) (*model.User, error)
	DeleteUser(ctx context.Context, id string) error
	ListUsers(ctx context.Context, filter types.UserFilter, limit, offset int) ([]*model.User, int64, error)
	AssignRoles(ctx context.Context, userID string, roleIDs []string) error
	RemoveRoles(ctx context.Context, userID string, roleIDs []string) error
	GetUserRoles(ctx context.Context, userID string) ([]*model.UserRole, error)
}
