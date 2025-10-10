package server

import (
	"github.com/gin-gonic/gin"

	"management_system/api/handler"
	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
	"management_system/internal/repository/mongodb"

	// Domain imports
	user_domain "management_system/internal/domains/user/services"
)

// RegisterUserRoutes registers user management endpoints
func (s *Server) RegisterUserRoutes(r *gin.Engine, roleRepo interface{}) {
	userCol := s.db.GetDatabase().Collection("users")
	userRoleCol := s.db.GetDatabase().Collection("user_roles")
	userRepo := mongodb.NewUserRepository(userCol)
	userRoleRepo := mongodb.NewUserRoleRepository(userRoleCol)
	// Cast roleRepo to correct type
	roleRepoTyped := roleRepo.(repoif.BaseRepository[model.Role])
	userSvc := user_domain.NewUserService(userRepo, userRoleRepo, roleRepoTyped)
	userH := handler.NewUserHandler(userSvc)
	
	users := r.Group("/users")
	{
		users.POST("", userH.CreateUser)
		users.GET("", userH.ListUsers)
		users.GET("/:id", userH.GetUser)
		users.PUT("/:id", userH.UpdateUser)           // Full update (replace entire resource)
		users.PATCH("/:id", userH.PartialUpdateUser)  // Partial update (update specific fields)
		users.DELETE("/:id", userH.DeleteUser)
		users.POST("/:id/roles", userH.AssignRoles)
		users.DELETE("/:id/roles", userH.RemoveRoles)
		users.GET("/:id/roles", userH.GetUserRoles)
	}
}
