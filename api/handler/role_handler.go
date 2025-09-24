package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"

	"management_system/internal/model"
	service "management_system/internal/service/interfaces"
	"management_system/internal/util"
)

type RoleHandler struct {
	svc service.RoleService
}

func NewRoleHandler(svc service.RoleService) *RoleHandler {
	return &RoleHandler{svc: svc}
}

// CreateRole
// @Summary      Create role
// @Description  Tạo role mới
// @Tags         roles
// @Accept       json
// @Produce      json
// @Param        body  body  model.Role  true  "Role payload"
// @Success      201   {object}  model.Role
// @Failure      400   {object}  map[string]string
// @Router       /roles [post]
func (h *RoleHandler) Create(c *gin.Context) {
	var in model.Role
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	out, err := h.svc.Create(c.Request.Context(), in)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, out)
}

// GetRoleByID
// @Summary      Get role by ID
// @Description  Lấy thông tin role theo ID
// @Tags         roles
// @Produce      json
// @Param        id   path      string  true  "Role ID"
// @Success      200  {object}  model.Role
// @Failure      400  {object}  map[string]string
// @Failure      404  {object}  map[string]string
// @Router       /roles/{id} [get]
func (h *RoleHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	out, err := h.svc.GetByID(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, out)
}

// UpdateRole
// @Summary      Update role
// @Description  Cập nhật thông tin role
// @Tags         roles
// @Accept       json
// @Produce      json
// @Param        id    path      string      true  "Role ID"
// @Param        body  body      model.Role  true  "Role payload"
// @Success      200   {object}  model.Role
// @Failure      400   {object}  map[string]string
// @Failure      404   {object}  map[string]string
// @Router       /roles/{id} [put]
func (h *RoleHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var in model.Role
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	out, err := h.svc.Update(c.Request.Context(), id, in)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, out)
}

// DeleteRole
// @Summary      Delete role
// @Description  Xóa role theo ID
// @Tags         roles
// @Param        id   path      string  true  "Role ID"
// @Success      204  {string}  string  "No Content"
// @Failure      400  {object}  map[string]string
// @Router       /roles/{id} [delete]
func (h *RoleHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.svc.Delete(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

// ListRoles
// @Summary      List roles
// @Description  Lấy danh sách roles với phân trang và filter
// @Tags         roles
// @Produce      json
// @Param        name    query     string  false  "Filter by role name"
// @Param        status  query     string  false  "Filter by status" Enums(active,inactive)
// @Param        page    query     int     false  "Trang hiện tại (bắt đầu từ 1)"   default(1)
// @Param        limit   query     int     false  "Số bản ghi mỗi trang"            default(20)
// @Success      200     {object}  map[string]interface{} "{ items: Role[], meta: { count,current_page,per_page,total,total_pages } }"
// @Failure      400     {object}  map[string]string
// @Router       /roles [get]
func (h *RoleHandler) List(c *gin.Context) {
	// Basic filter support via query string (?name=Admin)
	filter := bson.M{}
	if v := c.Query("name"); v != "" {
		filter["name"] = v
	}
	if v := c.Query("status"); v != "" {
		switch v {
		case "active":
			filter["isActive"] = true
		case "inactive":
			filter["isActive"] = false
		}
	}
	// Pagination via util
	p := util.ParsePagination(c)

	items, total, err := h.svc.List(c.Request.Context(), filter, p.Limit, p.Offset)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"items": items,
		"meta":  util.BuildMeta(total, p.Page, p.PerPage, len(items)),
	})
}
