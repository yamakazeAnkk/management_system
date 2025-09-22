package mongodb

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
)

// RoleRepository implements BaseRepository for model.Role
type RoleRepository struct {
	base repoif.BaseRepository[model.Role]
}

func NewRoleRepository(col *mongo.Collection) *RoleRepository {
	return &RoleRepository{base: NewMongoBaseRepository[model.Role](col)}
}

func (r *RoleRepository) Create(ctx context.Context, data model.Role) error {
	return r.base.Create(ctx, data)
}

func (r *RoleRepository) GetByID(ctx context.Context, id string) (model.Role, error) {
	return r.base.GetByID(ctx, id)
}

func (r *RoleRepository) Update(ctx context.Context, id string, data model.Role) error {
	return r.base.Update(ctx, id, data)
}

func (r *RoleRepository) Delete(ctx context.Context, id string) error {
	return r.base.Delete(ctx, id)
}

func (r *RoleRepository) List(ctx context.Context, filter map[string]interface{}, limit int, offset int) ([]model.Role, error) {
	return r.base.List(ctx, filter, limit, offset)
}

func (r *RoleRepository) Count(ctx context.Context, filter map[string]interface{}) (int64, error) {
	return r.base.Count(ctx, filter)
}
