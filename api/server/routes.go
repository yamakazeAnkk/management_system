package server

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"management_system/api/handler"
	"management_system/api/middleware"
	"management_system/internal/model"
	"management_system/internal/repository/mongodb"
	"management_system/internal/service"
	authutil "management_system/internal/util/auth"
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

	// Debug: seed admin user for login testing
	r.POST("/debug/seed-admin", func(c *gin.Context) {
		col := s.db.GetDatabase().Collection("users")
		username := "admin"
		// check exists
		var exists model.User
		err := col.FindOne(c.Request.Context(), map[string]any{"username": username}).Decode(&exists)
		if err == nil {
			c.JSON(http.StatusOK, gin.H{"message": "admin already exists"})
			return
		}
		hash, err := authutil.HashPassword("admin")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		u := model.User{
			ID:           model.NewUUID(),
			Username:     username,
			PasswordHash: hash,
			FullName:     "Administrator",
			IsActive:     true,
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
			Roles:        []model.UserRole{},
		}
		if _, err := col.InsertOne(c.Request.Context(), u); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"message": "seeded admin/admin"})
	})

	// Role routes
	roleCol := s.db.GetDatabase().Collection("roles")
	roleRepo := mongodb.NewRoleRepository(roleCol)
	roleSvc := service.NewRoleService(roleRepo)
	RegisterRoleRoutes(r, roleSvc)

	// Auth routes
	userRepo := mongodb.NewUserRepository(s.db.GetDatabase().Collection("users"))
	rtRepo := mongodb.NewRefreshTokenRepository(s.db.GetDatabase().Collection("refresh_tokens"))
	authSvc := service.NewAuthService(userRepo, rtRepo)
	authH := handler.NewAuthHandler(authSvc)
	auth := r.Group("/auth")
	{
		auth.POST("/register", authH.Register)
		auth.POST("/login", authH.Login)
		auth.POST("/refresh", authH.Refresh)
		auth.POST("/logout", authH.Logout)
	}

	// Protected example
	protected := r.Group("/api", middleware.JWTAuth())
	{
		protected.GET("/me", func(c *gin.Context) {
			uid, _ := c.Get("uid")
			c.JSON(http.StatusOK, gin.H{"userId": uid})
		})
	}

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
