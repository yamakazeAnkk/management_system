package api

import (
	"github.com/gin-gonic/gin"
)

// NewRouter configures and returns a Gin engine
func NewRouter() *gin.Engine {
	r := gin.Default()
	// TODO: mount middlewares and routes
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})
	return r
}
