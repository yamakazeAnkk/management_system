package model

import (
	"time"
)

// User model - Enhanced with comprehensive user information
type User struct {
	ID           UUID            `bson:"_id"`
	EmployeeID   string          `bson:"employeeId"` // EMP001, EMP002, etc.
	Username     string          `bson:"username"`
	PasswordHash string          `bson:"passwordHash"`
	PersonalInfo PersonalInfo    `bson:"personalInfo"`
	EmploymentInfo EmploymentInfo `bson:"employmentInfo"`
	ProfessionalInfo ProfessionalInfo `bson:"professionalInfo"`
	EmergencyContact EmergencyContact `bson:"emergencyContact"`
	Documents   UserDocuments   `bson:"documents"`
	Status       UserStatus      `bson:"status"`
	SecuritySettings SecuritySettings `bson:"securitySettings"`
	Metadata     UserMetadata    `bson:"metadata"`
}

// PersonalInfo contains personal details of the user
type PersonalInfo struct {
	FirstName string     `bson:"firstName"`
	LastName  string     `bson:"lastName"`
	FullName  string     `bson:"fullName"`
	Email     string     `bson:"email"`
	Phone     *string    `bson:"phone,omitempty"`
	DateOfBirth *time.Time `bson:"dateOfBirth,omitempty"`
	Gender    *string    `bson:"gender,omitempty"` // male, female, other
	Address   Address    `bson:"address"`
	AvatarURL *string    `bson:"avatarUrl,omitempty"`
}

// Address represents user's address information
type Address struct {
	Street     string  `bson:"street"`
	City       string  `bson:"city"`
	State      string  `bson:"state"`
	Country    string  `bson:"country"`
	PostalCode string  `bson:"postalCode"`
}

// EmploymentInfo contains employment-related information
type EmploymentInfo struct {
	DepartmentID    *UUID      `bson:"departmentId,omitempty"`
	Position        string     `bson:"position"`
	JobTitle        string     `bson:"jobTitle"`
	ManagerID       *UUID      `bson:"managerId,omitempty"`
	EmploymentType  string     `bson:"employmentType"` // full-time, part-time, contract
	WorkLocation    string     `bson:"workLocation"`
	JoinDate        time.Time  `bson:"joinDate"`
	Salary          Salary     `bson:"salary"`
	Benefits        []string   `bson:"benefits"`
	BonusEligible   bool       `bson:"bonusEligible"`
}

// Salary represents salary information
type Salary struct {
	Amount        float64 `bson:"amount"`
	Currency      string  `bson:"currency"`
	Type          string  `bson:"type"` // monthly, hourly, annual
	IsConfidential bool   `bson:"isConfidential"`
}

// ProfessionalInfo contains professional development information
type ProfessionalInfo struct {
	Skills         []string      `bson:"skills"`
	Certifications []string      `bson:"certifications"`
	Education      []Education   `bson:"education"`
	Languages      []string      `bson:"languages"`
}

// Education represents educational background
type Education struct {
	Degree      string `bson:"degree"`
	Institution string `bson:"institution"`
	Year        int    `bson:"year"`
}

// EmergencyContact contains emergency contact information
type EmergencyContact struct {
	Name         string `bson:"name"`
	Relationship string `bson:"relationship"`
	Phone        string `bson:"phone"`
	Email        string `bson:"email"`
}

// UserStatus represents current user status
type UserStatus struct {
	IsActive     bool       `bson:"isActive"`
	Status       string     `bson:"status"` // active, inactive, on-leave, terminated
	LastActiveAt *time.Time `bson:"lastActiveAt,omitempty"`
}

// SecuritySettings contains security-related settings
type SecuritySettings struct {
	RequireTwoFactor   bool       `bson:"requireTwoFactor"`
	PasswordChangedAt  *time.Time `bson:"passwordChangedAt,omitempty"`
	LastLoginAt        *time.Time `bson:"lastLoginAt,omitempty"`
	LoginAttempts      int        `bson:"loginAttempts"`
	LockedUntil        *time.Time `bson:"lockedUntil,omitempty"`
}

// UserDocuments contains document attachments for the user
type UserDocuments struct {
	Resume     *DocumentInfo `bson:"resume,omitempty"`
	IDDocument *DocumentInfo `bson:"idDocument,omitempty"`
	Photo      *DocumentInfo `bson:"photo,omitempty"`
	Contracts  []DocumentInfo `bson:"contracts,omitempty"`
	Certificates []DocumentInfo `bson:"certificates,omitempty"`
	Other      []DocumentInfo `bson:"other,omitempty"`
}

// DocumentInfo represents a document attachment
type DocumentInfo struct {
	ID          string    `bson:"id"`          // Unique document ID
	FileName    string    `bson:"fileName"`    // Original file name
	FileSize    int64     `bson:"fileSize"`    // File size in bytes
	MimeType    string    `bson:"mimeType"`    // MIME type (application/pdf, image/jpeg, etc.)
	FileURL     string    `bson:"fileUrl"`     // URL to access the file
	UploadedAt  time.Time `bson:"uploadedAt"`  // When the document was uploaded
	UploadedBy  *UUID     `bson:"uploadedBy,omitempty"` // Who uploaded the document
	Description string    `bson:"description,omitempty"` // Optional description
	IsActive    bool      `bson:"isActive"`    // Whether the document is active/current
}

// UserMetadata contains metadata about user record
type UserMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
	CreatedBy *UUID     `bson:"createdBy,omitempty"`
	UpdatedBy *UUID     `bson:"updatedBy,omitempty"`
}
