package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	employee_interfaces "management_system/internal/domains/employee/interfaces"
	employee_types "management_system/internal/domains/employee/types"
)

type EmployeeHandler struct {
	svc employee_interfaces.EmployeeService
}

func NewEmployeeHandler(svc employee_interfaces.EmployeeService) *EmployeeHandler {
	return &EmployeeHandler{svc: svc}
}

// CreateEmployee handles POST /employees to create a new employee
func (h *EmployeeHandler) CreateEmployee(c *gin.Context) {
	var req employee_types.CreateEmployeeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	emp, err := h.svc.CreateEmployee(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	resp := employee_types.CreateEmployeeResponse{
		Employee: employee_types.ConvertToEmployeeResponse(emp),
		Message:  "Employee created",
	}
	c.JSON(http.StatusCreated, resp)
}
