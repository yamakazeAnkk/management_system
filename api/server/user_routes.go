package server

import (
	"management_system/api/handler"
	"management_system/internal/repository/mongodb"

	"github.com/gin-gonic/gin"

	// Domain imports
	user_domain "management_system/internal/domains/user/services"
)

// RegisterUserRoutes registers user management endpoints
func (s *Server) RegisterUserRoutes(r *gin.Engine, roleRepo *mongodb.RoleRepository) {
	userCol := s.db.GetDatabase().Collection("users")
	userRoleCol := s.db.GetDatabase().Collection("user_roles")
	userRepo := mongodb.NewUserRepository(userCol)
	userRoleRepo := mongodb.NewUserRoleRepository(userRoleCol)
	userSvc := user_domain.NewUserService(userRepo, userRoleRepo, roleRepo)
	userH := handler.NewUserHandler(userSvc)
	
	users := r.Group("/users")
	{
		users.POST("", userH.CreateUser)
		users.GET("", userH.ListUsers)
		users.GET("/:id", userH.GetUser)
		users.PUT("/:id", userH.UpdateUser)
		users.DELETE("/:id", userH.DeleteUser)
		users.POST("/:id/roles", userH.AssignRoles)
		users.DELETE("/:id/roles", userH.RemoveRoles)
		users.GET("/:id/roles", userH.GetUserRoles)
	}
}
