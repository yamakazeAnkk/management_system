package interfaces

import (
	"context"
	"management_system/internal/model"
)

type UserRepository interface {
	BaseRepository[model.User]
	GetByUsername(ctx context.Context, username string) (*model.User, error)
	GetByEmail(ctx context.Context, email string) (*model.User, error)
	FindByUsername(ctx context.Context, username string) (*model.User, error)
}
