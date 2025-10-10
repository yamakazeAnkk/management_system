package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UUID is an alias to MongoDB's ObjectID for convenience across models
type UUID = primitive.ObjectID

func NewUUID() UUID {
	return primitive.NewObjectID()
}

func ObjectIDFromHex(hex string) (UUID, error) {
	return primitive.ObjectIDFromHex(hex)
}

func NewUUIDFromString(hex string) UUID {
	id, err := primitive.ObjectIDFromHex(hex)
	if err != nil {
		// Return new UUID if parsing fails
		return primitive.NewObjectID()
	}
	return id
}
