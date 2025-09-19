package mongodb

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoBaseRepository[T any] struct {
	col *mongo.Collection
}

func NewMongoBaseRepository[T any](col *mongo.Collection) *MongoBaseRepository[T] {
	return &MongoBaseRepository[T]{col: col}
}

func (r *MongoBaseRepository[T]) Create(ctx context.Context, data T) error {
	_, err := r.col.InsertOne(ctx, data)
	if err != nil {
		return err
	}
	 
	return err
}