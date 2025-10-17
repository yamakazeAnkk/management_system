package model

import (
	"time"
)

// Employee represents an employee in the organization
type Employee struct {
	ID               UUID                     `bson:"_id"`
	UserID           *UUID                    `bson:"userId,omitempty"` // Link to User table for authentication
	EmployeeID       string                   `bson:"employeeId"`       // EMP001, EMP002, etc. (unique business identifier)
	PersonalInfo     EmployeePersonalInfo     `bson:"personalInfo"`
	EmploymentInfo   EmployeeEmploymentInfo   `bson:"employmentInfo"`
	Compensation     EmployeeCompensation     `bson:"compensation"`
	EmergencyContact EmployeeEmergencyContact `bson:"emergencyContact"`
	ProfessionalInfo EmployeeProfessionalInfo `bson:"professionalInfo"`
	Documents        EmployeeDocuments        `bson:"documents"`
	Status           EmployeeStatus           `bson:"status"`
	Metadata         EmployeeMetadata         `bson:"metadata"`
}

// EmployeePersonalInfo contains personal details of the employee
type EmployeePersonalInfo struct {
	FirstName   string     `bson:"firstName"`
	LastName    string     `bson:"lastName"`
	Email       string     `bson:"email"` // Should match User.email if UserID is set
	Phone       *string    `bson:"phone,omitempty"`
	DateOfBirth *time.Time `bson:"dateOfBirth,omitempty"`
	Gender      *string    `bson:"gender,omitempty"`  // male, female, other, prefer-not
	Address     *string    `bson:"address,omitempty"` // Full address as text
}

// EmployeeEmploymentInfo contains employment-related information
type EmployeeEmploymentInfo struct {
	JobTitle       string    `bson:"jobTitle"`
	DepartmentID   *UUID     `bson:"departmentId,omitempty"` // Reference to Department
	ManagerID      *UUID     `bson:"managerId,omitempty"`    // Reference to another Employee
	StartDate      time.Time `bson:"startDate"`
	EmploymentType string    `bson:"employmentType"`     // full-time, part-time, contract, intern
	Location       *string   `bson:"location,omitempty"` // hq, remote, branch1, branch2 (matches frontend)
	EmployeeStatus string    `bson:"employeeStatus"`     // active, inactive, on-leave
}

// EmployeeCompensation contains compensation and benefits information
type EmployeeCompensation struct {
	BaseSalary    float64  `bson:"baseSalary"`
	SalaryType    string   `bson:"salaryType"` // annual, monthly, hourly
	Currency      string   `bson:"currency"`   // usd, eur, gbp
	BonusEligible bool     `bson:"bonusEligible"`
	Benefits      []string `bson:"benefits"` // Health Insurance, Dental Insurance, etc.
}

// EmployeeEmergencyContact contains emergency contact information
type EmployeeEmergencyContact struct {
	Name           *string `bson:"name,omitempty"`           // Contact full name
	Relationship   *string `bson:"relationship,omitempty"`   // spouse, parent, sibling, friend, other
	PhoneEmergency *string `bson:"phoneEmergency,omitempty"` // Emergency phone number
	EmailEmergency *string `bson:"emailEmergency,omitempty"` // Emergency email address
}

// EmployeeProfessionalInfo contains professional development information
type EmployeeProfessionalInfo struct {
	Skills []string `bson:"skills"`          // Array of skills - can contain many items
	Notes  *string  `bson:"notes,omitempty"` // Additional notes
}

// EmployeeDocuments contains document attachments for the employee
type EmployeeDocuments struct {
	Resume     []DocumentInfo `bson:"resume,omitempty"`     // Array of resume files
	IDDocument []DocumentInfo `bson:"idDocument,omitempty"` // Array of ID documents
	Photo      []DocumentInfo `bson:"photo,omitempty"`      // Array of photos
	Other      []DocumentInfo `bson:"other,omitempty"`      // Other documents
}

// EmployeeStatus represents current employee status
type EmployeeStatus struct {
	IsActive          bool       `bson:"isActive"`
	Status            string     `bson:"status"` // active, inactive, on-leave, terminated
	LastActiveAt      *time.Time `bson:"lastActiveAt,omitempty"`
	TerminatedAt      *time.Time `bson:"terminatedAt,omitempty"`
	TerminationReason *string    `bson:"terminationReason,omitempty"`
}

// EmployeeMetadata contains metadata about employee record
type EmployeeMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
	CreatedBy *UUID     `bson:"createdBy,omitempty"`
	UpdatedBy *UUID     `bson:"updatedBy,omitempty"`
}

// EmployeeFilter represents filtering options for employee queries
type EmployeeFilter struct {
	Department     *string    `json:"department,omitempty"`
	EmploymentType *string    `json:"employmentType,omitempty"`
	Status         *string    `json:"status,omitempty"`
	WorkLocation   *string    `json:"workLocation,omitempty"`
	ManagerID      *string    `json:"managerId,omitempty"`
	IsActive       *bool      `json:"isActive,omitempty"`
	Search         *string    `json:"search,omitempty"`
	CreatedAfter   *time.Time `json:"createdAfter,omitempty"`
	CreatedBefore  *time.Time `json:"createdBefore,omitempty"`
}

// Constants for employee data validation
const (
	// Employment type options
	EmploymentTypeFullTime = "full-time"
	EmploymentTypePartTime = "part-time"
	EmploymentTypeContract = "contract"
	EmploymentTypeIntern   = "intern"

	// Work location options
	WorkLocationHQ      = "hq"
	WorkLocationRemote  = "remote"
	WorkLocationBranch1 = "branch1"
	WorkLocationBranch2 = "branch2"

	// Employee status options
	EmployeeStatusActive     = "active"
	EmployeeStatusInactive   = "inactive"
	EmployeeStatusOnLeave    = "on-leave"
	EmployeeStatusTerminated = "terminated"

	// Gender options
	GenderMale         = "male"
	GenderFemale       = "female"
	GenderOther        = "other"
	GenderPreferNotSay = "prefer-not"

	// Relationship options
	RelationshipSpouse  = "spouse"
	RelationshipParent  = "parent"
	RelationshipSibling = "sibling"
	RelationshipFriend  = "friend"
	RelationshipOther   = "other"

	// Salary type options
	SalaryTypeAnnual  = "annual"
	SalaryTypeMonthly = "monthly"
	SalaryTypeHourly  = "hourly"

	// Currency options
	CurrencyUSD = "usd"
	CurrencyEUR = "eur"
	CurrencyGBP = "gbp"
)

// ValidEmploymentTypes returns list of valid employment types
func ValidEmploymentTypes() []string {
	return []string{
		EmploymentTypeFullTime,
		EmploymentTypePartTime,
		EmploymentTypeContract,
		EmploymentTypeIntern,
	}
}

// ValidWorkLocations returns list of valid work locations
func ValidWorkLocations() []string {
	return []string{
		WorkLocationHQ,
		WorkLocationRemote,
		WorkLocationBranch1,
		WorkLocationBranch2,
	}
}

// ValidEmployeeStatuses returns list of valid employee statuses
func ValidEmployeeStatuses() []string {
	return []string{
		EmployeeStatusActive,
		EmployeeStatusInactive,
		EmployeeStatusOnLeave,
		EmployeeStatusTerminated,
	}
}

// ValidGenders returns list of valid gender options
func ValidGenders() []string {
	return []string{
		GenderMale,
		GenderFemale,
		GenderOther,
		GenderPreferNotSay,
	}
}

// ValidRelationships returns list of valid relationship options
func ValidRelationships() []string {
	return []string{
		RelationshipSpouse,
		RelationshipParent,
		RelationshipSibling,
		RelationshipFriend,
		RelationshipOther,
	}
}

// ValidSalaryTypes returns list of valid salary types
func ValidSalaryTypes() []string {
	return []string{
		SalaryTypeAnnual,
		SalaryTypeMonthly,
		SalaryTypeHourly,
	}
}

// ValidCurrencies returns list of valid currencies
func ValidCurrencies() []string {
	return []string{
		CurrencyUSD,
		CurrencyEUR,
		CurrencyGBP,
	}
}

// GetFullName returns the full name of the employee
func (e *Employee) GetFullName() string {
	return e.PersonalInfo.FirstName + " " + e.PersonalInfo.LastName
}

// IsActive returns whether the employee is currently active
func (e *Employee) IsActive() bool {
	return e.Status.IsActive && e.Status.Status == EmployeeStatusActive
}

// CanReceiveBenefits returns whether the employee is eligible for benefits
func (e *Employee) CanReceiveBenefits() bool {
	return e.IsActive() && e.EmploymentInfo.EmploymentType == EmploymentTypeFullTime
}
