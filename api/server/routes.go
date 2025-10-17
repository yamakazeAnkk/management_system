package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"management_system/api/middleware"
	"management_system/internal/repository/mongodb"

	// Domain imports

	role_domain "management_system/internal/domains/role/services"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())
	r.Use(middleware.ErrorHandler())

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Add your frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true, // Enable cookies/auth
	}))

	// System routes
	r.GET("/", s.HelloWorldHandler)
	r.GET("/health", s.healthHandler)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Initialize repositories
	roleCol := s.db.GetDatabase().Collection("roles")
	roleRepo := mongodb.NewRoleRepository(roleCol)
	roleSvc := role_domain.NewRoleService(roleRepo)

	userCol := s.db.GetDatabase().Collection("users")
	userRepo := mongodb.NewUserRepository(userCol)
	employeeCol := s.db.GetDatabase().Collection("employees")
	_ = employeeCol // initialized for RegisterEmployeeRoutes

	// Register route groups
	s.RegisterDebugRoutes(r)
	s.RegisterRoleRoutes(r, roleSvc)
	s.RegisterFileRoutes(r, roleRepo)
	s.RegisterUserRoutes(r, roleRepo)
	s.RegisterAuthRoutes(r, userRepo)
	s.RegisterEmployeeRoutes(r)
	s.RegisterProtectedRoutes(r)

	return r
}

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, s.db.Health())
}
