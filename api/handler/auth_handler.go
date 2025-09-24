package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	sif "management_system/internal/service/interfaces"
)

type AuthHandler struct {
	svc sif.AuthService
}

func NewAuthHandler(svc sif.AuthService) *AuthHandler { return &AuthHandler{svc: svc} }

// @Summary Login
// @Tags auth
// @Accept json
// @Produce json
// @Param body body interfaces.LoginInput true "Credentials"
// @Success 200 {object} interfaces.TokenPair
// @Router /auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var in sif.LoginInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	out, err := h.svc.Login(c.Request.Context(), in)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, out)
}

// @Summary Register
// @Tags auth
// @Accept json
// @Produce json
// @Param body body interfaces.RegisterInput true "Register"
// @Success 201 {string} string "Created"
// @Router /auth/register [post]
func (h *AuthHandler) Register(c *gin.Context) {
	var in sif.RegisterInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.svc.Register(c.Request.Context(), in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusCreated)
}

// @Summary Refresh token
// @Tags auth
// @Accept json
// @Produce json
// @Param refreshToken query string true "Refresh token"
// @Success 200 {object} interfaces.TokenPair
// @Router /auth/refresh [post]
func (h *AuthHandler) Refresh(c *gin.Context) {
	rt := c.Query("refreshToken")
	out, err := h.svc.Refresh(c.Request.Context(), rt)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, out)
}

// @Summary Logout
// @Tags auth
// @Param refreshToken query string true "Refresh token"
// @Success 204 {string} string "No Content"
// @Router /auth/logout [post]
func (h *AuthHandler) Logout(c *gin.Context) {
	rt := c.Query("refreshToken")
	if err := h.svc.Logout(c.Request.Context(), rt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}
