package mongodb

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
)

type RefreshTokenRepository interface {
	repoif.BaseRepository[model.RefreshToken]
	RevokeByHash(ctx context.Context, hash string) error
	FindActiveByHash(ctx context.Context, hash string) (*model.RefreshToken, error)
}

type refreshTokenRepository struct {
	*MongoBaseRepository[model.RefreshToken]
	col *mongo.Collection
}

func NewRefreshTokenRepository(col *mongo.Collection) RefreshTokenRepository {
	return &refreshTokenRepository{MongoBaseRepository: NewMongoBaseRepository[model.RefreshToken](col), col: col}
}

func (r *refreshTokenRepository) RevokeByHash(ctx context.Context, hash string) error {
	_, err := r.col.UpdateOne(ctx, bson.M{"tokenHash": hash, "isRevoked": false}, bson.M{"$set": bson.M{"isRevoked": true}})
	return err
}

func (r *refreshTokenRepository) FindActiveByHash(ctx context.Context, hash string) (*model.RefreshToken, error) {
	var t model.RefreshToken
	err := r.col.FindOne(ctx, bson.M{"tokenHash": hash, "isRevoked": false}).Decode(&t)
	if err != nil {
		return nil, err
	}
	return &t, nil
}
