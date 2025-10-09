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
			ID:         model.NewUUID(),
			EmployeeID: "EMP000001",
			Username:   username,
			PasswordHash: hash,
			PersonalInfo: model.PersonalInfo{
				FirstName: "Admin",
				LastName:  "User",
				FullName:  "Administrator",
				Email:     "admin@company.com",
				Address: model.Address{
					Street:     "",
					City:       "",
					State:      "",
					Country:    "",
					PostalCode: "",
				},
			},
			EmploymentInfo: model.EmploymentInfo{
				Position:       "System Administrator",
				JobTitle:       "Administrator",
				EmploymentType: "full-time",
				WorkLocation:   "Office",
				JoinDate:       time.Now(),
				Salary: model.Salary{
					Amount:        0,
					Currency:      "USD",
					Type:          "monthly",
					IsConfidential: true,
				},
				Benefits:      []string{},
				BonusEligible: false,
			},
			ProfessionalInfo: model.ProfessionalInfo{
				Skills:         []string{},
				Certifications: []string{},
				Education:      []model.Education{},
				Languages:      []string{},
			},
			EmergencyContact: model.EmergencyContact{
				Name:         "",
				Relationship: "",
				Phone:        "",
				Email:        "",
			},
			Documents: model.UserDocuments{
				Contracts:    []model.DocumentInfo{},
				Certificates: []model.DocumentInfo{},
				Other:        []model.DocumentInfo{},
			},
			Status: model.UserStatus{
				IsActive: true,
				Status:   "active",
			},
			SecuritySettings: model.SecuritySettings{
				RequireTwoFactor: true,
				LoginAttempts:    0,
			},
			Metadata: model.UserMetadata{
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			},
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

	// User routes
	userCol := s.db.GetDatabase().Collection("users")
	userRoleCol := s.db.GetDatabase().Collection("user_roles")
	userRepo := mongodb.NewUserRepository(userCol)
	userRoleRepo := mongodb.NewUserRoleRepository(userRoleCol)
	userSvc := service.NewUserService(userRepo, userRoleRepo, roleRepo)
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

	// Auth routes
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
