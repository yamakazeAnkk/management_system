package model

import (
	"time"
)

// User model - Authentication and authorization only
type User struct {
	ID           UUID            `bson:"_id"`
	Username     string          `bson:"username"`
	Email        string          `bson:"email"`
	PasswordHash string          `bson:"passwordHash"`
	Role         string          `bson:"role"`
	Status       string          `bson:"status"`
	LastLoginAt  *time.Time      `bson:"lastLoginAt,omitempty"`
	CreatedAt    time.Time       `bson:"createdAt"`
	UpdatedAt    time.Time       `bson:"updatedAt"`
}


