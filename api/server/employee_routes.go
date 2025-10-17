package server

import (
	"github.com/gin-gonic/gin"

	"management_system/api/handler"
	employee_domain "management_system/internal/domains/employee/services"
	"management_system/internal/repository/mongodb"
)

// RegisterEmployeeRoutes registers employee endpoints
func (s *Server) RegisterEmployeeRoutes(r *gin.Engine) {
	employeeCol := s.db.GetDatabase().Collection("employees")
	employeeRepo := mongodb.NewEmployeeRepository(employeeCol)
	employeeSvc := employee_domain.NewEmployeeService(employeeRepo)
	employeeH := handler.NewEmployeeHandler(employeeSvc)

	employees := r.Group("/employees")
	{
		employees.POST("", employeeH.CreateEmployee)
		// Additional routes can be added here later (GET, PUT, PATCH, DELETE)
	}
}
