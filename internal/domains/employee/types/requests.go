package types

import (
	"management_system/internal/model"
	"time"
)

// CreateEmployeeRequest represents request data for creating an employee
type CreateEmployeeRequest struct {
	UserID           *model.UUID                    `json:"userId,omitempty"` // Link to User table for authentication
	PersonalInfo     model.EmployeePersonalInfo     `json:"personalInfo" validate:"required"`
	EmploymentInfo   model.EmployeeEmploymentInfo   `json:"employmentInfo" validate:"required"`
	Compensation     model.EmployeeCompensation     `json:"compensation" validate:"required"`
	EmergencyContact model.EmployeeEmergencyContact `json:"emergencyContact"`
	ProfessionalInfo model.EmployeeProfessionalInfo `json:"professionalInfo"`
	Documents        model.EmployeeDocuments        `json:"documents"`
}

// UpdateEmployeeRequest represents request data for updating an employee (full update)
type UpdateEmployeeRequest struct {
	PersonalInfo     *model.EmployeePersonalInfo     `json:"personalInfo,omitempty"`
	EmploymentInfo   *model.EmployeeEmploymentInfo   `json:"employmentInfo,omitempty"`
	Compensation     *model.EmployeeCompensation     `json:"compensation,omitempty"`
	EmergencyContact *model.EmployeeEmergencyContact `json:"emergencyContact,omitempty"`
	ProfessionalInfo *model.EmployeeProfessionalInfo `json:"professionalInfo,omitempty"`
	Documents        *model.EmployeeDocuments        `json:"documents,omitempty"`
	Status           *model.EmployeeStatus           `json:"status,omitempty"`
}

// PartialUpdateEmployeeRequest represents request data for partial employee update
type PartialUpdateEmployeeRequest struct {
	// Personal Info fields
	FirstName   *string    `json:"firstName,omitempty"`
	LastName    *string    `json:"lastName,omitempty"`
	Email       *string    `json:"email,omitempty"`
	Phone       *string    `json:"phone,omitempty"`
	DateOfBirth *time.Time `json:"dateOfBirth,omitempty"`
	Gender      *string    `json:"gender,omitempty"`
	Address     *string    `json:"address,omitempty"`

	// Employment Info fields
	JobTitle       *string     `json:"jobTitle,omitempty"`
	Department     *string     `json:"department,omitempty"`
	ManagerID      *model.UUID `json:"managerId,omitempty"`
	StartDate      *time.Time  `json:"startDate,omitempty"`
	EmploymentType *string     `json:"employmentType,omitempty"`
	Location       *string     `json:"location,omitempty"`
	EmployeeStatus *string     `json:"employeeStatus,omitempty"`

	// Compensation fields
	BaseSalary    *float64 `json:"baseSalary,omitempty"`
	SalaryType    *string  `json:"salaryType,omitempty"`
	Currency      *string  `json:"currency,omitempty"`
	BonusEligible *bool    `json:"bonusEligible,omitempty"`
	Benefits      []string `json:"benefits,omitempty"`

	// Emergency Contact fields
	EmergencyName         *string `json:"emergencyName,omitempty"`
	EmergencyRelationship *string `json:"emergencyRelationship,omitempty"`
	EmergencyPhone        *string `json:"emergencyPhone,omitempty"`
	EmergencyEmail        *string `json:"emergencyEmail,omitempty"`

	// Professional Info fields
	Skills *[]string `json:"skills,omitempty"`
	Notes  *string   `json:"notes,omitempty"`

	// Status fields
	IsActive          *bool      `json:"isActive,omitempty"`
	Status            *string    `json:"status,omitempty"`
	LastActiveAt      *time.Time `json:"lastActiveAt,omitempty"`
	TerminatedAt      *time.Time `json:"terminatedAt,omitempty"`
	TerminationReason *string    `json:"terminationReason,omitempty"`
}
