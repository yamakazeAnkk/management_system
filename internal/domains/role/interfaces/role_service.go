package interfaces

import (
	"context"
	"management_system/internal/model"
)

type RoleService interface {
	Create(ctx context.Context, role model.Role) (model.Role, error)
	GetByID(ctx context.Context, id string) (model.Role, error)
	Update(ctx context.Context, id string, role model.Role) (model.Role, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter map[string]interface{}, limit, offset int) ([]model.Role, int64, error)
}
