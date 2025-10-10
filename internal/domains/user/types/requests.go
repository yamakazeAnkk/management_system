package types

import (
	"management_system/internal/model"
)

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

type UserFilter struct {
	DepartmentID *string `json:"departmentId,omitempty"`
	IsActive     *bool   `json:"isActive,omitempty"`
	EmployeeID   *string `json:"employeeId,omitempty"`
	Search       *string `json:"search,omitempty"`
}
