package server

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"management_system/internal/repository/mongodb"
	"management_system/internal/service"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Add your frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true, // Enable cookies/auth
	}))

	r.GET("/", s.HelloWorldHandler)

	r.GET("/health", s.healthHandler)

	// Swagger UI
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Debug: show DB name and collections
	r.GET("/debug/db-info", func(c *gin.Context) {
		db := s.db.GetDatabase()
		if db == nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "db is nil"})
			return
		}
		ctx := c.Request.Context()
		cols, err := db.ListCollectionNames(ctx, map[string]any{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"database": db.Name(), "collections": cols})
	})

	// Debug: simple write to Atlas to verify connectivity
	r.POST("/debug/test-write", func(c *gin.Context) {
		var body map[string]interface{}
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if body == nil {
			body = map[string]interface{}{}
		}
		body["_type"] = "debug_test"
		body["userAgent"] = c.Request.UserAgent()
		body["remoteAddr"] = c.ClientIP()
		body["ts"] = time.Now()
		col := s.db.GetDatabase().Collection("debug_tests")
		res, err := col.InsertOne(c.Request.Context(), body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"insertedId": res.InsertedID})
	})

	// Role routes
	roleCol := s.db.GetDatabase().Collection("roles")
	roleRepo := mongodb.NewRoleRepository(roleCol)
	roleSvc := service.NewRoleService(roleRepo)
	RegisterRoleRoutes(r, roleSvc)

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
