package services

import (
	"context"
	"errors"
	"time"

	"management_system/internal/model"
	"management_system/internal/domains/role/interfaces"
	repoif "management_system/internal/repository/interface"
)

type roleService struct {
	repo repoif.BaseRepository[model.Role]
}

func NewRoleService(repo repoif.BaseRepository[model.Role]) interfaces.RoleService {
	return &roleService{repo: repo}
}

func (s *roleService) Create(ctx context.Context, role model.Role) (model.Role, error) {
	if role.ID == (model.UUID{}) {
		role.ID = model.NewUUID()
	}
	now := time.Now()
	if role.Metadata.CreatedAt.IsZero() {
		role.Metadata.CreatedAt = now
	}
	role.Metadata.UpdatedAt = now
	if role.Name == "" {
		return role, errors.New("name is required")
	}
	if err := s.repo.Create(ctx, role); err != nil {
		return role, err
	}
	return role, nil
}

func (s *roleService) GetByID(ctx context.Context, id string) (model.Role, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *roleService) Update(ctx context.Context, id string, role model.Role) (model.Role, error) {
	role.Metadata.UpdatedAt = time.Now()
	if err := s.repo.Update(ctx, id, role); err != nil {
		return role, err
	}
	return s.repo.GetByID(ctx, id)
}

func (s *roleService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

func (s *roleService) List(ctx context.Context, filter map[string]interface{}, limit, offset int) ([]model.Role, int64, error) {
	items, err := s.repo.List(ctx, filter, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	total, err := s.repo.Count(ctx, filter)
	if err != nil {
		return nil, 0, nil
	}
	return items, total, nil
}
