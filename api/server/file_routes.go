package server

import (
	"fmt"

	"management_system/api/handler"
	"management_system/internal/repository/mongodb"

	"github.com/gin-gonic/gin"

	// Domain imports
	employee_domain "management_system/internal/domains/employee/services"
	storage_interfaces "management_system/internal/domains/storage/interfaces"
	storage_domain "management_system/internal/domains/storage/services"
	user_domain "management_system/internal/domains/user/services"
)

// RegisterFileRoutes registers file upload and management endpoints
func (s *Server) RegisterFileRoutes(r *gin.Engine, roleRepo interface{}) {
	// Firebase Storage Service - Try real implementation first, fallback to mock
	var firebaseStorage storage_interfaces.StorageService
	realStorage, err := storage_domain.NewFirebaseStorageServiceReal()
	if err != nil {
		fmt.Printf("Warning: failed to initialize real Firebase Storage, using mock: %v\n", err)
		// Fallback to mock implementation
		mockStorage, err := storage_domain.NewFirebaseStorageService()
		if err != nil {
			fmt.Printf("Error: failed to initialize mock Firebase Storage: %v\n", err)
		} else {
			firebaseStorage = mockStorage
		}
	} else {
		fmt.Println("Successfully initialized real Firebase Storage")
		firebaseStorage = realStorage
	}

	if firebaseStorage == nil {
		return
	}

	// File upload routes
	files := r.Group("/files")
	{
		// We'll initialize the handler in the route handlers to avoid circular dependency
		files.POST("/upload/avatar/:userId", s.createFileUploadHandler("/upload/avatar", firebaseStorage, roleRepo))
		files.POST("/upload/document/:userId", s.createFileUploadHandler("/upload/document", firebaseStorage, roleRepo))
		files.DELETE("/delete", s.createFileDeleteHandler(firebaseStorage))
		files.GET("/info", s.createFileInfoHandler(firebaseStorage))
	}

	// Test routes for Firebase Storage
	testUploadH := handler.NewTestUploadHandler(firebaseStorage)
	test := r.Group("/test")
	{
		test.POST("/upload", testUploadH.TestUpload)
		test.POST("/upload/avatar", testUploadH.TestAvatarUpload)
		test.POST("/upload/document", testUploadH.TestDocumentUpload)
		test.GET("/file-info", testUploadH.TestGetFileInfo)
		test.DELETE("/file", testUploadH.TestDeleteFile)
	}
}

func (s *Server) createFileUploadHandler(endpoint string, firebaseStorage storage_interfaces.StorageService, roleRepo interface{}) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Create Employee service for document management
		employeeCol := s.db.GetDatabase().Collection("employees")
		employeeRepo := mongodb.NewEmployeeRepository(employeeCol)
		employeeSvc := employee_domain.NewEmployeeService(employeeRepo)
		userDocSvc := user_domain.NewUserDocumentService(employeeSvc, firebaseStorage)
		fileH := handler.NewFileHandler(firebaseStorage, userDocSvc)

		if endpoint == "/upload/avatar" {
			fileH.UploadAvatar(c)
		} else {
			fileH.UploadDocument(c)
		}
	}
}

func (s *Server) createFileDeleteHandler(firebaseStorage storage_interfaces.StorageService) gin.HandlerFunc {
	return func(c *gin.Context) {
		fileH := handler.NewFileHandler(firebaseStorage, nil)
		fileH.DeleteFile(c)
	}
}

func (s *Server) createFileInfoHandler(firebaseStorage storage_interfaces.StorageService) gin.HandlerFunc {
	return func(c *gin.Context) {
		fileH := handler.NewFileHandler(firebaseStorage, nil)
		fileH.GetFileInfo(c)
	}
}
