package model

import "time"

// Department represents an organizational department with hierarchy support
type Department struct {
	ID          UUID               `bson:"_id"`
	Name        string             `bson:"name"`
	Code        string             `bson:"code"` // HR, IT, FINANCE, etc.
	IsActive    bool               `bson:"isActive"`
	Description string             `bson:"description"`
	Metadata    DepartmentMetadata `bson:"metadata"`
}

// DepartmentContact contains contact information for the department
type DepartmentContact struct{}

// DepartmentMetadata contains metadata about department record
type DepartmentMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
