package server

import (
	"github.com/gin-gonic/gin"

	"management_system/api/handler"
	"management_system/internal/repository/mongodb"

	// Domain imports
	user_domain "management_system/internal/domains/user/services"
)

// RegisterUserRoutes registers user management endpoints
func (s *Server) RegisterUserRoutes(r *gin.Engine, roleRepo interface{}) {
	userCol := s.db.GetDatabase().Collection("users")
	userRepo := mongodb.NewUserRepository(userCol)
	userSvc := user_domain.NewUserService(userRepo)
	userH := handler.NewUserHandler(userSvc)
	
	users := r.Group("/users")
	{
		users.POST("", userH.CreateUser)
		users.GET("", userH.ListUsers)
		users.GET("/:id", userH.GetUser)
		users.PUT("/:id", userH.UpdateUser)           // Full update (replace entire resource)
		users.PATCH("/:id", userH.PartialUpdateUser)  // Partial update (update specific fields)
		users.DELETE("/:id", userH.DeleteUser)
	}
}
