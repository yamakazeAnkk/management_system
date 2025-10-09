package mongodb

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
)

type userRoleRepository struct {
	*MongoBaseRepository[model.UserRole]
	col *mongo.Collection
}

func NewUserRoleRepository(col *mongo.Collection) repoif.BaseRepository[model.UserRole] {
	return &userRoleRepository{
		MongoBaseRepository: NewMongoBaseRepository[model.UserRole](col),
		col:                 col,
	}
}

func (r *userRoleRepository) FindByUserID(ctx context.Context, userID model.UUID) ([]*model.UserRole, error) {
	filter := bson.M{"userId": userID, "isActive": true}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var userRoles []*model.UserRole
	for cursor.Next(ctx) {
		var userRole model.UserRole
		if err := cursor.Decode(&userRole); err != nil {
			return nil, err
		}
		userRoles = append(userRoles, &userRole)
	}
	return userRoles, nil
}

func (r *userRoleRepository) FindByRoleID(ctx context.Context, roleID model.UUID) ([]*model.UserRole, error) {
	filter := bson.M{"roleId": roleID, "isActive": true}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var userRoles []*model.UserRole
	for cursor.Next(ctx) {
		var userRole model.UserRole
		if err := cursor.Decode(&userRole); err != nil {
			return nil, err
		}
		userRoles = append(userRoles, &userRole)
	}
	return userRoles, nil
}
