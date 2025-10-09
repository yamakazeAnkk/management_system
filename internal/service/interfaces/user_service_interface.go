package interfaces

import (
	"context"

	"management_system/internal/model"
)

// CreateUserRequest represents the input for creating a new user
type CreateUserRequest struct {
	Username         string                    `json:"username"`
	Password         string                    `json:"password"`
	EmployeeID       string                    `json:"employeeId"`
	PersonalInfo     model.PersonalInfo        `json:"personalInfo"`
	EmploymentInfo   model.EmploymentInfo      `json:"employmentInfo"`
	ProfessionalInfo model.ProfessionalInfo    `json:"professionalInfo"`
	EmergencyContact model.EmergencyContact    `json:"emergencyContact"`
	Documents        *model.UserDocuments      `json:"documents,omitempty"`
	RoleIDs          []string                  `json:"roleIds"`
}

// UpdateUserRequest represents the input for updating a user
type UpdateUserRequest struct {
	Username         *string                    `json:"username,omitempty"`
	PersonalInfo     *model.PersonalInfo        `json:"personalInfo,omitempty"`
	EmploymentInfo   *model.EmploymentInfo      `json:"employmentInfo,omitempty"`
	ProfessionalInfo *model.ProfessionalInfo    `json:"professionalInfo,omitempty"`
	EmergencyContact *model.EmergencyContact    `json:"emergencyContact,omitempty"`
	Documents        *model.UserDocuments       `json:"documents,omitempty"`
	Status           *model.UserStatus          `json:"status,omitempty"`
	RoleIDs          []string                   `json:"roleIds,omitempty"`
}

// UserFilter represents filters for user queries
type UserFilter struct {
	DepartmentID *string `json:"departmentId,omitempty"`
	IsActive     *bool   `json:"isActive,omitempty"`
	EmployeeID   *string `json:"employeeId,omitempty"`
	Search       *string `json:"search,omitempty"`
}

// UserService defines the contract for user-related operations
type UserService interface {
	CreateUser(ctx context.Context, req CreateUserRequest) (*model.User, error)
	GetUser(ctx context.Context, id string) (*model.User, error)
	GetUserByUsername(ctx context.Context, username string) (*model.User, error)
	GetUserByEmployeeID(ctx context.Context, employeeID string) (*model.User, error)
	UpdateUser(ctx context.Context, id string, req UpdateUserRequest) (*model.User, error)
	DeleteUser(ctx context.Context, id string) error
	ListUsers(ctx context.Context, filter UserFilter, limit, offset int) ([]*model.User, int64, error)
	AssignRoles(ctx context.Context, userID string, roleIDs []string) error
	RemoveRoles(ctx context.Context, userID string, roleIDs []string) error
	GetUserRoles(ctx context.Context, userID string) ([]*model.UserRole, error)
}
