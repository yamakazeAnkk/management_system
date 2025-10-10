package server

import (
	"github.com/gin-gonic/gin"

	"management_system/api/handler"
	repoif "management_system/internal/repository/interface"
	"management_system/internal/repository/mongodb"

	// Domain imports
	auth_domain "management_system/internal/domains/auth/services"
)

// RegisterAuthRoutes registers authentication endpoints
func (s *Server) RegisterAuthRoutes(r *gin.Engine, userRepo repoif.UserRepository) {
	rtRepo := mongodb.NewRefreshTokenRepository(s.db.GetDatabase().Collection("refresh_tokens"))
	authSvc := auth_domain.NewAuthService(userRepo, rtRepo)
	authH := handler.NewAuthHandler(authSvc)
	
	auth := r.Group("/auth")
	{
		auth.POST("/register", authH.Register)
		auth.POST("/login", authH.Login)
		auth.POST("/refresh", authH.Refresh)
		auth.POST("/logout", authH.Logout)
	}
}
