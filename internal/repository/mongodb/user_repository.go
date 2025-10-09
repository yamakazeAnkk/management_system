package mongodb

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
)

type userRepository struct {
	*MongoBaseRepository[model.User]
	col *mongo.Collection
}

func NewUserRepository(col *mongo.Collection) repoif.UserRepository {
	return &userRepository{MongoBaseRepository: NewMongoBaseRepository[model.User](col), col: col}
}

func (r *userRepository) FindByUsername(ctx context.Context, username string) (*model.User, error) {
	var u model.User
	err := r.col.FindOne(ctx, bson.M{"username": username}).Decode(&u)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *userRepository) FindByEmployeeID(ctx context.Context, employeeID string) (*model.User, error) {
	var u model.User
	err := r.col.FindOne(ctx, bson.M{"employeeId": employeeID}).Decode(&u)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *userRepository) ListByDepartmentId(ctx context.Context, departmentId string) ([]model.User, error) {
	filter := bson.M{"departmentId": departmentId}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []model.User
	for cursor.Next(ctx) {
		var user model.User
		if err := cursor.Decode(&user); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func (r *userRepository) ListByRoleId(ctx context.Context, roleId string) ([]model.User, error) {
	filter := bson.M{"roles.roleId": roleId}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []model.User
	for cursor.Next(ctx) {
		var user model.User
		if err := cursor.Decode(&user); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}


