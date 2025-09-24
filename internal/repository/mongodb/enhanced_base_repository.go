package mongodb

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"management_system/internal/util"
)

// EnhancedMongoBaseRepository with configurable mapper
type EnhancedMongoBaseRepository[T any] struct {
	col    *mongo.Collection
	mapper *util.Mapper
}

// NewEnhancedMongoBaseRepository creates a repository with custom mapper
func NewEnhancedMongoBaseRepository[T any](col *mongo.Collection, mapper *util.Mapper) *EnhancedMongoBaseRepository[T] {
	if mapper == nil {
		mapper = util.DefaultMapper
	}
	return &EnhancedMongoBaseRepository[T]{
		col:    col,
		mapper: mapper,
	}
}

// NewMongoBaseRepositoryWithConfig creates a repository with custom mapper config
func NewMongoBaseRepositoryWithConfig[T any](col *mongo.Collection, config *util.MapperConfig) *EnhancedMongoBaseRepository[T] {
	mapper := util.NewMapper(config)
	return &EnhancedMongoBaseRepository[T]{
		col:    col,
		mapper: mapper,
	}
}

func (r *EnhancedMongoBaseRepository[T]) Create(ctx context.Context, data T) error {
	if r.col == nil {
		return errors.New("collection is nil")
	}

	// Use custom mapper
	if err := r.mapper.SetDefaults(&data); err != nil {
		return err
	}

	_, err := r.col.InsertOne(ctx, data)
	return err
}

func (r *EnhancedMongoBaseRepository[T]) Update(ctx context.Context, id string, data T) error {
	if r.col == nil {
		return errors.New("collection is nil")
	}

	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid id")
	}

	// Use custom mapper
	if err := r.mapper.SetUpdateDefaults(&data); err != nil {
		return err
	}
	updateDoc := r.mapper.RemoveID(&data)

	res, err := r.col.UpdateOne(ctx, bson.M{"_id": oid}, bson.M{"$set": updateDoc})
	if err != nil {
		return err
	}
	if res.MatchedCount == 0 {
		return errors.New("no document found to update")
	}
	return nil
}

// GetByID, Delete, List, Count methods remain the same...
func (r *EnhancedMongoBaseRepository[T]) GetByID(ctx context.Context, id string) (T, error) {
	var data T
	if r.col == nil {
		return data, errors.New("collection is nil")
	}
	if oid, errHex := primitive.ObjectIDFromHex(id); errHex == nil {
		if err := r.col.FindOne(ctx, bson.M{"_id": oid}).Decode(&data); err == nil {
			return data, nil
		}
	}
	err := r.col.FindOne(ctx, bson.M{"_id": id}).Decode(&data)
	if err == mongo.ErrNoDocuments {
		return data, errors.New("document not found")
	}
	return data, err
}

func (r *EnhancedMongoBaseRepository[T]) Delete(ctx context.Context, id string) error {
	if r.col == nil {
		return errors.New("collection is nil")
	}
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid id")
	}
	res, err := r.col.DeleteOne(ctx, bson.M{"_id": oid})
	if err != nil {
		return err
	}
	if res.DeletedCount == 0 {
		return errors.New("no document found to delete")
	}
	return nil
}

func (r *EnhancedMongoBaseRepository[T]) List(ctx context.Context, filter map[string]interface{}, limit int, offset int) ([]T, error) {
	if r.col == nil {
		return nil, errors.New("collection is nil")
	}
	findOptions := options.Find()
	if limit > 0 {
		findOptions.SetLimit(int64(limit))
	}
	if offset > 0 {
		findOptions.SetSkip(int64(offset))
	}
	cursor, err := r.col.Find(ctx, filter, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var data []T
	for cursor.Next(ctx) {
		var item T
		if err := cursor.Decode(&item); err != nil {
			return nil, err
		}
		data = append(data, item)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return data, nil
}

func (r *EnhancedMongoBaseRepository[T]) Count(ctx context.Context, filter map[string]interface{}) (int64, error) {
	if r.col == nil {
		return 0, errors.New("collection is nil")
	}
	return r.col.CountDocuments(ctx, filter)
}
