package server

import (
	"net/http"
	"time"

	"management_system/internal/model"
	authutil "management_system/internal/util/auth"

	"github.com/gin-gonic/gin"
)

// RegisterDebugRoutes registers debug and development endpoints
func (s *Server) RegisterDebugRoutes(r *gin.Engine) {
	// Debug: show DB name and collections
	r.GET("/debug/db-info", s.debugDBInfo)

	// Debug: simple write to Atlas to verify connectivity
	r.POST("/debug/test-write", s.debugTestWrite)

	// Debug: seed admin user for login testing
	r.POST("/debug/seed-admin", s.debugSeedAdmin)
}

func (s *Server) debugDBInfo(c *gin.Context) {
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
}

func (s *Server) debugTestWrite(c *gin.Context) {
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
}

func (s *Server) debugSeedAdmin(c *gin.Context) {
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
		Email:        "admin@company.com",
		PasswordHash: hash,
		Role:         "admin",
		Status:       "active",
		LastLoginAt:  nil,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}
	if _, err := col.InsertOne(c.Request.Context(), u); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "seeded admin/admin"})
}
