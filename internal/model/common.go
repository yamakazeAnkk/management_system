package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UUID is an alias to MongoDB's ObjectID for convenience across models
type UUID = primitive.ObjectID

func NewUUID() UUID {
	return primitive.NewObjectID()

}
