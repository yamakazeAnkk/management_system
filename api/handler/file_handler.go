package handler

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"

	// Domain imports
	storage_interfaces "management_system/internal/domains/storage/interfaces"
	user_domain "management_system/internal/domains/user/services"
)

type FileHandler struct {
	storageService storage_interfaces.StorageService
	userDocService *user_domain.UserDocumentService
}

func NewFileHandler(storageService storage_interfaces.StorageService, userDocService *user_domain.UserDocumentService) *FileHandler {
	return &FileHandler{
		storageService: storageService,
		userDocService: userDocService,
	}
}

// UploadAvatar uploads user avatar
func (h *FileHandler) UploadAvatar(c *gin.Context) {
	userID := c.Param("userId")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	file, header, err := c.Request.FormFile("avatar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "avatar file is required"})
		return
	}
	defer file.Close()

	// Validate file type
	allowedTypes := []string{".jpg", ".jpeg", ".png", ".gif", ".webp"}
	ext := strings.ToLower(filepath.Ext(header.Filename))
	if !contains(allowedTypes, ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid file type. Only images are allowed"})
		return
	}

	// Validate file size (5MB max)
	if header.Size > 5*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file size too large. Maximum 5MB allowed"})
		return
	}

	documentInfo, err := h.userDocService.UploadUserAvatar(c.Request.Context(), userID, file, header)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload avatar: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "avatar uploaded successfully",
		"data":    documentInfo,
	})
}

// UploadDocument uploads user document
func (h *FileHandler) UploadDocument(c *gin.Context) {
	userID := c.Param("userId")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user ID is required"})
		return
	}

	documentType := c.PostForm("documentType")
	if documentType == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "document type is required"})
		return
	}

	// Validate document type
	allowedTypes := []string{"resume", "id-document", "photo", "contract", "certificate", "other"}
	if !contains(allowedTypes, documentType) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid document type"})
		return
	}

	file, header, err := c.Request.FormFile("document")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "document file is required"})
		return
	}
	defer file.Close()

	// Validate file type based on document type
	var allowedExts []string
	switch documentType {
	case "resume", "contract", "certificate":
		allowedExts = []string{".pdf", ".doc", ".docx"}
	case "id-document":
		allowedExts = []string{".pdf", ".jpg", ".jpeg", ".png"}
	case "photo":
		allowedExts = []string{".jpg", ".jpeg", ".png", ".gif", ".webp"}
	default:
		allowedExts = []string{".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".txt"}
	}

	ext := strings.ToLower(filepath.Ext(header.Filename))
	if !contains(allowedExts, ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid file type for document type: " + documentType})
		return
	}

	// Validate file size (10MB max for documents)
	if header.Size > 10*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file size too large. Maximum 10MB allowed"})
		return
	}

	description := c.PostForm("description")
	documentInfo, err := h.userDocService.UploadUserDocument(c.Request.Context(), userID, documentType, file, header, description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload document: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "document uploaded successfully",
		"documentInfo": documentInfo,
	})
}

// DeleteFile deletes a file from Firebase Storage
func (h *FileHandler) DeleteFile(c *gin.Context) {
	fileURL := c.PostForm("fileUrl")
	if fileURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file URL is required"})
		return
	}

	err := h.storageService.DeleteFile(c.Request.Context(), fileURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete file: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "file deleted successfully",
	})
}

// GetFileInfo gets file information
func (h *FileHandler) GetFileInfo(c *gin.Context) {
	fileURL := c.Query("fileUrl")
	if fileURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file URL is required"})
		return
	}

	info, err := h.storageService.GetFileInfo(c.Request.Context(), fileURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get file info: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": info,
	})
}

// Helper functions
func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
