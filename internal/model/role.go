package model

import "time"

type Role struct {
	ID             UUID      `bson:"_id"`
	Name           string    `bson:"name"`
	Description    *string   `bson:"description,omitempty"`
	IsSystem       bool      `bson:"isSystem"`
	IsActive       bool      `bson:"isActive"`
	CreatedAt      time.Time `bson:"createdAt"`
	UpdatedAt      time.Time `bson:"updatedAt"`
	PermissionKeys []string  `bson:"permissionKeys"` // ví dụ: ["employee.read","employee.write"]
}
