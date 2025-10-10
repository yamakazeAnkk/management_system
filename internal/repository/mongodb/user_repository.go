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

func (r *userRepository) GetByUsername(ctx context.Context, username string) (*model.User, error) {
	var u model.User
	err := r.col.FindOne(ctx, bson.M{"username": username}).Decode(&u)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *userRepository) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	var u model.User
	err := r.col.FindOne(ctx, bson.M{"email": email}).Decode(&u)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *userRepository) FindByUsername(ctx context.Context, username string) (*model.User, error) {
	var u model.User
	err := r.col.FindOne(ctx, bson.M{"username": username}).Decode(&u)
	if err != nil {
		return nil, err
	}
	return &u, nil
}




