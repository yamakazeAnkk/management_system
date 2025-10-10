package server

import (
	"net/http"

	"management_system/api/middleware"

	"github.com/gin-gonic/gin"
)

// RegisterProtectedRoutes registers protected endpoints that require authentication
func (s *Server) RegisterProtectedRoutes(r *gin.Engine) {
	protected := r.Group("/api", middleware.JWTAuth())
	{
		protected.GET("/me", s.getCurrentUser)
	}
}

func (s *Server) getCurrentUser(c *gin.Context) {
	uid, _ := c.Get("uid")
	c.JSON(http.StatusOK, gin.H{"userId": uid})
}
