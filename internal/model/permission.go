package model

import "time"

// Permission represents a granular permission in the system
type Permission struct {
	ID           UUID                `bson:"_id"`
	Key          string              `bson:"key"` // unique, e.g. "employee.read"
	Name         string              `bson:"name"` // display text
	Description  string              `bson:"description"`
	Module       string              `bson:"module"` // e.g. "employee"
	Resource     string              `bson:"resource"` // e.g. "employee", "job", "candidate"
	Action       string              `bson:"action"` // e.g. "read", "create", "update", "delete"
	Category     string              `bson:"category"` // crud, reporting, system, etc.
	IsSystem     bool                `bson:"isSystem"`
	IsActive     bool                `bson:"isActive"`
	Dependencies []string            `bson:"dependencies"` // other permission keys required
	Metadata     PermissionMetadata  `bson:"metadata"`
}

// PermissionMetadata contains metadata about permission record
type PermissionMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
