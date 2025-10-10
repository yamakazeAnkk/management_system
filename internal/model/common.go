package model

import (
	"time"

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

// DocumentInfo represents a document attachment (shared across models)
type DocumentInfo struct {
	ID          string    `bson:"id"`
	FileName    string    `bson:"fileName"`
	FileSize    int64     `bson:"fileSize"`
	MimeType    string    `bson:"mimeType"`
	FileURL     string    `bson:"fileUrl"`
	UploadedAt  time.Time `bson:"uploadedAt"`
	UploadedBy  *UUID     `bson:"uploadedBy,omitempty"`
	Description string    `bson:"description,omitempty"`
	IsActive    bool      `bson:"isActive"`
}
