package types

import (
	"management_system/internal/model"
	"time"
)

// EmployeeResponse represents response data for employee API
type EmployeeResponse struct {
	ID               model.UUID                     `json:"id"`
	UserID           *model.UUID                    `json:"userId,omitempty"`
	EmployeeID       string                         `json:"employeeId"`
	PersonalInfo     model.EmployeePersonalInfo     `json:"personalInfo"`
	EmploymentInfo   model.EmployeeEmploymentInfo   `json:"employmentInfo"`
	Compensation     model.EmployeeCompensation     `json:"compensation"`
	EmergencyContact model.EmployeeEmergencyContact `json:"emergencyContact"`
	ProfessionalInfo model.EmployeeProfessionalInfo `json:"professionalInfo"`
	Documents        model.EmployeeDocuments        `json:"documents"`
	Status           model.EmployeeStatus           `json:"status"`
	Metadata         model.EmployeeMetadata         `json:"metadata"`
}

// EmployeeListResponse represents response for employee list API
type EmployeeListResponse struct {
	Employees []EmployeeResponse `json:"employees"`
	Total     int64              `json:"total"`
	Limit     int                `json:"limit"`
	Offset    int                `json:"offset"`
}

// EmployeeSummaryResponse represents a simplified employee response for list views
type EmployeeSummaryResponse struct {
	ID             model.UUID `json:"id"`
	EmployeeID     string     `json:"employeeId"`
	FullName       string     `json:"fullName"`
	Email          string     `json:"email"`
	JobTitle       string     `json:"jobTitle"`
	Department     string     `json:"department"`
	EmploymentType string     `json:"employmentType"`
	Status         string     `json:"status"`
	IsActive       bool       `json:"isActive"`
	StartDate      time.Time  `json:"startDate"`
}

// EmployeeStatsResponse represents statistics about employees
type EmployeeStatsResponse struct {
	TotalEmployees      int64            `json:"totalEmployees"`
	ActiveEmployees     int64            `json:"activeEmployees"`
	InactiveEmployees   int64            `json:"inactiveEmployees"`
	DepartmentStats     map[string]int64 `json:"departmentStats"`
	EmploymentTypeStats map[string]int64 `json:"employmentTypeStats"`
	StatusStats         map[string]int64 `json:"statusStats"`
}

// CreateEmployeeResponse represents response after creating an employee
type CreateEmployeeResponse struct {
	Employee EmployeeResponse `json:"employee"`
	Message  string           `json:"message"`
}

// UpdateEmployeeResponse represents response after updating an employee
type UpdateEmployeeResponse struct {
	Employee EmployeeResponse `json:"employee"`
	Message  string           `json:"message"`
}

// DeleteEmployeeResponse represents response after deleting an employee
type DeleteEmployeeResponse struct {
	Message string `json:"message"`
}

// ConvertToEmployeeResponse converts a model.Employee to EmployeeResponse
func ConvertToEmployeeResponse(employee *model.Employee) EmployeeResponse {
	return EmployeeResponse{
		ID:               employee.ID,
		UserID:           employee.UserID,
		EmployeeID:       employee.EmployeeID,
		PersonalInfo:     employee.PersonalInfo,
		EmploymentInfo:   employee.EmploymentInfo,
		Compensation:     employee.Compensation,
		EmergencyContact: employee.EmergencyContact,
		ProfessionalInfo: employee.ProfessionalInfo,
		Documents:        employee.Documents,
		Status:           employee.Status,
		Metadata:         employee.Metadata,
	}
}

// ConvertToEmployeeSummaryResponse converts a model.Employee to EmployeeSummaryResponse
func ConvertToEmployeeSummaryResponse(employee *model.Employee) EmployeeSummaryResponse {
	return EmployeeSummaryResponse{
		ID:             employee.ID,
		EmployeeID:     employee.EmployeeID,
		FullName:       employee.GetFullName(),
		Email:          employee.PersonalInfo.Email,
		JobTitle:       employee.EmploymentInfo.JobTitle,
		Department:     employee.EmploymentInfo.DepartmentID.String(),
		EmploymentType: employee.EmploymentInfo.EmploymentType,
		Status:         employee.Status.Status,
		IsActive:       employee.Status.IsActive,
		StartDate:      employee.EmploymentInfo.StartDate,
	}
}
