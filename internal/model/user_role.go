package model

import "time"

// UserRole represents a role assigned to a user
type UserRole struct {
	RoleID            UUID      `bson:"roleId"`
	ScopeDepartmentID *UUID     `bson:"scopeDepartmentId,omitempty"` // nil => toàn org
	AssignedAt        time.Time `bson:"assignedAt"`
}
