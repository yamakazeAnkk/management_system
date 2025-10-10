package handler

import (
	"net/http"
	"path/filepath"
	"strings"

	storage_interfaces "management_system/internal/domains/storage/interfaces"
	"management_system/internal/domains/storage/types"
	"github.com/gin-gonic/gin"
)

type TestUploadHandler struct {
	storageService storage_interfaces.StorageService
}

func NewTestUploadHandler(storageService storage_interfaces.StorageService) *TestUploadHandler {
	return &TestUploadHandler{
		storageService: storageService,
	}
}

// TestUpload tests file upload to Firebase Storage
func (h *TestUploadHandler) TestUpload(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file is required"})
		return
	}
	defer file.Close()

	// Validate file type
	allowedTypes := []string{".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf", ".doc", ".docx", ".txt"}
	ext := strings.ToLower(filepath.Ext(header.Filename))
	if !contains(allowedTypes, ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid file type"})
		return
	}

	// Validate file size (10MB max)
	if header.Size > 10*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file size too large. Maximum 10MB allowed"})
		return
	}

	// Test upload
	testUserID := "test_user_123"
	response, err := h.storageService.UploadFile(c.Request.Context(), types.FileUploadRequest{
		File:        file,
		Header:      header,
		Folder:      "test",
		UserID:      testUserID,
		DocumentType: "test-document",
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload file: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "file uploaded successfully",
		"data":    response,
		"test_info": gin.H{
			"user_id": testUserID,
			"folder": "test",
			"document_type": "test-document",
		},
	})
}

// TestAvatarUpload tests avatar upload
func (h *TestUploadHandler) TestAvatarUpload(c *gin.Context) {
	file, header, err := c.Request.FormFile("avatar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "avatar file is required"})
		return
	}
	defer file.Close()

	// Validate file type (images only)
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

	// Test avatar upload
	testUserID := "test_user_123"
	response, err := h.storageService.UploadAvatar(c.Request.Context(), file, header, testUserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload avatar: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "avatar uploaded successfully",
		"data":    response,
		"test_info": gin.H{
			"user_id": testUserID,
			"folder": "avatars",
			"document_type": "avatar",
		},
	})
}

// TestDocumentUpload tests document upload
func (h *TestUploadHandler) TestDocumentUpload(c *gin.Context) {
	file, header, err := c.Request.FormFile("document")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "document file is required"})
		return
	}
	defer file.Close()

	documentType := c.PostForm("documentType")
	if documentType == "" {
		documentType = "test-document"
	}

	// Validate file type
	allowedExts := []string{".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".txt"}
	ext := strings.ToLower(filepath.Ext(header.Filename))
	if !contains(allowedExts, ext) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid file type"})
		return
	}

	// Validate file size (10MB max)
	if header.Size > 10*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file size too large. Maximum 10MB allowed"})
		return
	}

	// Test document upload
	testUserID := "test_user_123"
	response, err := h.storageService.UploadDocument(c.Request.Context(), file, header, testUserID, documentType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload document: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "document uploaded successfully",
		"data":    response,
		"test_info": gin.H{
			"user_id": testUserID,
			"folder": "documents",
			"document_type": documentType,
		},
	})
}

// TestGetFileInfo tests getting file info
func (h *TestUploadHandler) TestGetFileInfo(c *gin.Context) {
	fileURL := c.Query("fileUrl")
	if fileURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fileUrl parameter is required"})
		return
	}

	info, err := h.storageService.GetFileInfo(c.Request.Context(), fileURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get file info: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "file info retrieved successfully",
		"data":    info,
	})
}

// TestDeleteFile tests deleting a file
func (h *TestUploadHandler) TestDeleteFile(c *gin.Context) {
	fileURL := c.PostForm("fileUrl")
	if fileURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fileUrl is required"})
		return
	}

	err := h.storageService.DeleteFile(c.Request.Context(), fileURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete file: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "file deleted successfully",
		"file_url": fileURL,
	})
}
