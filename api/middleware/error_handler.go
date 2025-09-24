package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"management_system/internal/errx"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if rec := recover(); rec != nil {
				ae := errx.New(500000)
				c.AbortWithStatusJSON(ae.HTTP, gin.H{"code": ae.Code, "message": ae.Message})
			}
		}()

		c.Next()

		if len(c.Errors) > 0 {
			// Take the last error
			err := c.Errors.Last().Err
			if ae, ok := err.(errx.AppError); ok {
				c.AbortWithStatusJSON(ae.HTTP, gin.H{"code": ae.Code, "message": ae.Message})
				return
			}
			// Fallback
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"code": 500000, "message": "Internal server error"})
		}
	}
}
