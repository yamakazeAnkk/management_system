package interfaces

import (
	"context"

	"management_system/internal/model"
)

// EmployeeRepository defines the interface for employee data operations
type EmployeeRepository interface {
	BaseRepository[model.Employee]

	// Employee-specific methods
	GetByEmployeeID(ctx context.Context, employeeID string) (model.Employee, error)
	FindByEmployeeID(ctx context.Context, employeeID string) (*model.Employee, error)
	FindByUserID(ctx context.Context, userID string) (*model.Employee, error)
	FindByEmail(ctx context.Context, email string) (*model.Employee, error)
	FindByDepartment(ctx context.Context, department string) ([]model.Employee, error)
	FindByManager(ctx context.Context, managerID string) ([]model.Employee, error)
	FindActiveEmployees(ctx context.Context) ([]model.Employee, error)
	FindByEmploymentType(ctx context.Context, employmentType string) ([]model.Employee, error)
	FindByWorkLocation(ctx context.Context, workLocation string) ([]model.Employee, error)
	
	// Advanced queries
	ListWithDetails(ctx context.Context, filter model.EmployeeFilter, limit int, offset int) ([]model.Employee, error)
	CountWithDetails(ctx context.Context, filter model.EmployeeFilter) (int64, error)
	FindWithFilter(ctx context.Context, filter model.EmployeeFilter, limit int, offset int) ([]model.Employee, error)
	CountWithFilter(ctx context.Context, filter model.EmployeeFilter) (int64, error)
	FindBySkills(ctx context.Context, skills []string) ([]model.Employee, error)
	FindBySalaryRange(ctx context.Context, minSalary, maxSalary float64) ([]model.Employee, error)
	
	// Statistics
	GetDepartmentStats(ctx context.Context) (map[string]int64, error)
	GetEmploymentTypeStats(ctx context.Context) (map[string]int64, error)
	GetStatusStats(ctx context.Context) (map[string]int64, error)
	
	// Bulk operations
	BulkUpdateStatus(ctx context.Context, employeeIDs []string, status string) error
	BulkUpdateDepartment(ctx context.Context, employeeIDs []string, department string) error
	BulkUpdateManager(ctx context.Context, employeeIDs []string, managerID string) error
}
