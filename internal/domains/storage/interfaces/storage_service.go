package interfaces

import (
	"context"
	"mime/multipart"
	"management_system/internal/domains/storage/types"
)

type StorageService interface {
	UploadFile(ctx context.Context, req types.FileUploadRequest) (*types.FileUploadResponse, error)
	UploadAvatar(ctx context.Context, file multipart.File, header *multipart.FileHeader, userID string) (*types.FileUploadResponse, error)
	UploadDocument(ctx context.Context, file multipart.File, header *multipart.FileHeader, userID, documentType string) (*types.FileUploadResponse, error)
	DeleteFile(ctx context.Context, fileURL string) error
	GetFileInfo(ctx context.Context, fileURL string) (*types.FileUploadResponse, error)
}
