package interfaces

import (
	"context"
	"management_system/internal/model"
)

type UserRepository interface {
	BaseRepository[model.User]
	FindByUsername(ctx context.Context, username string) (*model.User, error)
	ListByDepartmentId(ctx context.Context, departmentId string) ([]model.User, error)
	ListByRoleId(ctx context.Context, roleId string) ([]model.User, error)
}
