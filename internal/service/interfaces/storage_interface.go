package interfaces

import (
	"context"
	"mime/multipart"
	
)

// StorageService defines the interface for file storage operations
type StorageService interface {
	UploadFile(ctx context.Context, req FileUploadRequest) (*FileUploadResponse, error)
	UploadAvatar(ctx context.Context, file multipart.File, header *multipart.FileHeader, userID string) (*FileUploadResponse, error)
	UploadDocument(ctx context.Context, file multipart.File, header *multipart.FileHeader, userID, documentType string) (*FileUploadResponse, error)
	DeleteFile(ctx context.Context, fileURL string) error
	GetFileInfo(ctx context.Context, fileURL string) (*FileUploadResponse, error)
}

// FileUploadRequest represents a file upload request
type FileUploadRequest struct {
	File        multipart.File
	Header      *multipart.FileHeader
	Folder      string // e.g., "avatars", "documents", "resumes"
	UserID      string
	DocumentType string // e.g., "resume", "id-document", "photo"
}

// FileUploadResponse represents the response after file upload
type FileUploadResponse struct {
	FileURL    string `json:"fileUrl"`
	FileName   string `json:"fileName"`
	FileSize   int64  `json:"fileSize"`
	MimeType   string `json:"mimeType"`
	UploadedAt string `json:"uploadedAt"`
}

