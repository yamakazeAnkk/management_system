package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	autil "management_system/internal/util/auth"
)

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authH := c.GetHeader("Authorization")
		if !strings.HasPrefix(authH, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		token := strings.TrimPrefix(authH, "Bearer ")
		claims, err := autil.ParseToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}
		c.Set("uid", claims.UserID)
		c.Set("roles", claims.Roles)
		c.Set("perms", claims.Perms)
		c.Next()
	}
}
