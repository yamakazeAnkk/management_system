package service

import (
	"context"
	"errors"
	"time"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
	service "management_system/internal/service/interfaces"
)

// Implementation is in this file; interface moved to role_service_interface.go

type roleService struct {
	repo repoif.BaseRepository[model.Role]
}

func NewRoleService(repo repoif.BaseRepository[model.Role]) service.RoleService {
	return &roleService{repo: repo}
}

func (s *roleService) Create(ctx context.Context, in model.Role) (model.Role, error) {
	if in.ID == (model.UUID{}) {
		in.ID = model.NewUUID()
	}
	now := time.Now()
	if in.CreatedAt.IsZero() {
		in.CreatedAt = now
	}
	in.UpdatedAt = now
	if in.Name == "" {
		return in, errors.New("name is required")
	}
	if err := s.repo.Create(ctx, in); err != nil {
		return in, err
	}
	return in, nil
}

func (s *roleService) GetByID(ctx context.Context, id string) (model.Role, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *roleService) Update(ctx context.Context, id string, in model.Role) (model.Role, error) {
	in.UpdatedAt = time.Now()
	if err := s.repo.Update(ctx, id, in); err != nil {
		return in, err
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
		return nil, 0, err
	}
	return items, total, nil
}
