package interfaces

import (
	"context"
)

type BaseRepository[T any] interface {
	Create(ctx context.Context, data T) error
	GetByID(ctx context.Context, id string) (T, error)
	Update(ctx context.Context, id string, data T) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter map[string]interface{}, limit int, offset int) ([]T, error)
	Count(ctx context.Context, filter map[string]interface{}) (int64, error)
}
