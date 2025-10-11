package handler

import (
	employee_interfaces "management_system/internal/domains/employee/interfaces"
)

type EmployeeHandler struct {
	svc employee_interfaces.EmployeeService
}

func NewEmployeeHandler(svc employee_interfaces.EmployeeService) *EmployeeHandler {
	return &EmployeeHandler{svc: svc}
}
