package interfaces

import (
	"context"

	"management_system/internal/domains/employee/types"
	"management_system/internal/model"
)

type EmployeeService interface {
	CreateEmployee(ctx context.Context, req types.CreateEmployeeRequest) (*model.Employee, error)
	GetEmployee(ctx context.Context, id string) (*model.Employee, error)
	GetEmployeeByEmployeeID(ctx context.Context, employeeID string) (*model.Employee, error)
	UpdateEmployee(ctx context.Context, id string, req types.UpdateEmployeeRequest) (*model.Employee, error)
	PartialUpdateEmployee(ctx context.Context, id string, req types.PartialUpdateEmployeeRequest) (*model.Employee, error)
	DeleteEmployee(ctx context.Context, id string) error
	ListEmployees(ctx context.Context, filter model.EmployeeFilter, limit, offset int) ([]*model.Employee, int64, error)
}
