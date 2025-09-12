package model

import "time"

type UserRole struct {
	RoleID            UUID      `bson:"roleId"`
	ScopeDepartmentID *UUID     `bson:"scopeDepartmentId,omitempty"` // nil => toàn org
	AssignedAt        time.Time `bson:"assignedAt"`
}
