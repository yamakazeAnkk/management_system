package server

import (
	"github.com/gin-gonic/gin"

	"management_system/api/handler"
	svciface "management_system/internal/service/interfaces"
)

// RegisterRoleRoutes registers Role endpoints on the provided router using the given service
func (s *Server) RegisterRoleRoutes(r *gin.Engine, svc svciface.RoleService) {
	h := handler.NewRoleHandler(svc)
	roles := r.Group("/roles")
	{
		roles.GET("", h.List)
		roles.POST("", h.Create)
		roles.GET("/:id", h.GetByID)
		roles.PUT("/:id", h.Update)
		roles.DELETE("/:id", h.Delete)
	}
}
