package model

import "time"

// UserRole represents a role assignment to a user with enhanced scoping and tracking
type UserRole struct {
	ID             UUID                `bson:"_id"`
	UserID         UUID                `bson:"userId"`
	RoleID         UUID                `bson:"roleId"`
	AssignmentType string              `bson:"assignmentType"` // primary, secondary, temporary
	Scope          UserRoleScope       `bson:"scope"`
	EffectiveDates UserRoleDates       `bson:"effectiveDates"`
	AssignedBy     *UUID               `bson:"assignedBy,omitempty"`
	Notes          string              `bson:"notes"`
	IsActive       bool                `bson:"isActive"`
	Metadata       UserRoleMetadata    `bson:"metadata"`
}

// UserRoleScope defines the scope of a role assignment
type UserRoleScope struct {
	DepartmentID *UUID    `bson:"departmentId,omitempty"` // null = organization-wide
	LocationCode string   `bson:"locationCode"`
	ProjectIds   []UUID   `bson:"projectIds"`
}

// UserRoleDates defines effective dates for role assignment
type UserRoleDates struct {
	AssignedAt    time.Time  `bson:"assignedAt"`
	EffectiveFrom time.Time  `bson:"effectiveFrom"`
	EffectiveTo   *time.Time `bson:"effectiveTo,omitempty"` // null = permanent
}

// UserRoleMetadata contains metadata about user role assignment
type UserRoleMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
