package model

import "time"

// Department represents an organizational department with hierarchy support
type Department struct {
	ID                UUID                `bson:"_id"`
	Name              string              `bson:"name"`
	Code              string              `bson:"code"` // HR, IT, FINANCE, etc.
	Description       string              `bson:"description"`
	ParentDepartmentID *UUID              `bson:"parentDepartmentId,omitempty"` // for hierarchy
	ManagerID         *UUID               `bson:"managerId,omitempty"`
	BudgetCode        string              `bson:"budgetCode"`
	Location          string              `bson:"location"`
	ContactInfo       DepartmentContact   `bson:"contactInfo"`
	IsActive          bool                `bson:"isActive"`
	Metadata          DepartmentMetadata  `bson:"metadata"`
}

// DepartmentContact contains contact information for the department
type DepartmentContact struct {
	Email   string `bson:"email"`
	Phone   string `bson:"phone"`
	Address string `bson:"address"`
}

// DepartmentMetadata contains metadata about department record
type DepartmentMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
