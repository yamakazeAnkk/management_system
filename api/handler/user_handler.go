package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	user_interfaces "management_system/internal/domains/user/interfaces"
	user_types "management_system/internal/domains/user/types"
)

type UserHandler struct {
	userService user_interfaces.UserService
}

func NewUserHandler(userService user_interfaces.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// CreateUser creates a new user with full details
func (h *UserHandler) CreateUser(c *gin.Context) {
	var req user_types.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.userService.CreateUser(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// GetUser retrieves a user by ID
func (h *UserHandler) GetUser(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	user, err := h.userService.GetUser(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateUser updates a user
func (h *UserHandler) UpdateUser(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	var req user_types.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.userService.UpdateUser(c.Request.Context(), id, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// PartialUpdateUser partially updates a user (PATCH)
// @Summary      Partial update user
// @Description  Cập nhật một phần user (chỉ fields được gửi)
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id    path      string                    true  "User ID"
// @Param        body  body      map[string]interface{}    true  "Partial user data"
// @Success      200   {object}  model.User
// @Failure      400   {object}  map[string]string
// @Failure      404   {object}  map[string]string
// @Router       /users/{id} [patch]
func (h *UserHandler) PartialUpdateUser(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	// Verify user exists
	_, err := h.userService.GetUser(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// Parse partial update data
	var partialData map[string]interface{}
	if err := c.ShouldBindJSON(&partialData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Use proper partial update service method
	user, err := h.userService.PartialUpdateUser(c.Request.Context(), id, partialData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser deletes a user
func (h *UserHandler) DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	err := h.userService.DeleteUser(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "user deleted successfully"})
}

// ListUsers lists users with optional filtering
func (h *UserHandler) ListUsers(c *gin.Context) {
	// Parse query parameters
	limitStr := c.DefaultQuery("limit", "10")
	offsetStr := c.DefaultQuery("offset", "0")
	departmentID := c.Query("departmentId")
	isActiveStr := c.Query("isActive")
	employeeID := c.Query("employeeId")
	search := c.Query("search")

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}

	offset, err := strconv.Atoi(offsetStr)
	if err != nil || offset < 0 {
		offset = 0
	}

	// Build filter
	filter := user_types.UserFilter{}
	if departmentID != "" {
		filter.DepartmentID = &departmentID
	}
	if isActiveStr != "" {
		isActive, err := strconv.ParseBool(isActiveStr)
		if err == nil {
			filter.IsActive = &isActive
		}
	}
	if employeeID != "" {
		filter.EmployeeID = &employeeID
	}
	if search != "" {
		filter.Search = &search
	}

	users, total, err := h.userService.ListUsers(c.Request.Context(), filter, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
		"total": total,
		"limit": limit,
		"offset": offset,
	})
}

// AssignRoles assigns roles to a user
func (h *UserHandler) AssignRoles(c *gin.Context) {
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	var req struct {
		RoleIDs []string `json:"roleIds" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.userService.AssignRoles(c.Request.Context(), userID, req.RoleIDs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "roles assigned successfully"})
}

// RemoveRoles removes roles from a user
func (h *UserHandler) RemoveRoles(c *gin.Context) {
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	var req struct {
		RoleIDs []string `json:"roleIds" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.userService.RemoveRoles(c.Request.Context(), userID, req.RoleIDs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "roles removed successfully"})
}

// GetUserRoles gets roles assigned to a user
func (h *UserHandler) GetUserRoles(c *gin.Context) {
	userID := c.Param("id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	roles, err := h.userService.GetUserRoles(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"roles": roles})
}
