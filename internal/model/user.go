package model

import (
	"time"
)

// User model
type User struct {
	ID            UUID       `bson:"_id"`
	Username      string     `bson:"username"`
	PasswordHash  string     `bson:"passwordHash"`
	FullName      string     `bson:"fullName"`
	Email         *string    `bson:"email,omitempty"`
	Phone         *string    `bson:"phone,omitempty"`
	DepartmentID  *UUID      `bson:"departmentId,omitempty"`
	PositionLevel *int32     `bson:"positionLevel,omitempty"` // 1=Staff,2=Lead,3=Manager
	LocationCode  *string    `bson:"locationCode,omitempty"`  // HCM/HN...
	IsActive      bool       `bson:"isActive"`
	CreatedAt     time.Time  `bson:"createdAt"`
	UpdatedAt     time.Time  `bson:"updatedAt"`
	Roles         []UserRole `bson:"roles"` // embedded
}
