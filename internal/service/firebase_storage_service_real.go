package service

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"path/filepath"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

type FirebaseStorageServiceReal struct {
	client *storage.Client
	bucket *storage.BucketHandle
}

// Ensure FirebaseStorageServiceReal implements StorageService interface
var _ StorageService = (*FirebaseStorageServiceReal)(nil)

func NewFirebaseStorageServiceReal() (*FirebaseStorageServiceReal, error) {
	ctx := context.Background()
	
	// Create Google Cloud Storage client directly
	client, err := storage.NewClient(ctx, option.WithCredentialsFile("bookstore-59884-firebase-adminsdk-p59pi-6c92c7a670.json"))
	if err != nil {
		return nil, fmt.Errorf("error creating storage client: %v", err)
	}

	// Get bucket handle
	bucket := client.Bucket("bookstore-59884.appspot.com")

	return &FirebaseStorageServiceReal{
		client: client,
		bucket: bucket,
	}, nil
}

// UploadFile uploads a file to Firebase Storage (real implementation)
func (s *FirebaseStorageServiceReal) UploadFile(ctx context.Context, req FileUploadRequest) (*FileUploadResponse, error) {
	// Generate unique filename
	ext := filepath.Ext(req.Header.Filename)
	timestamp := time.Now().Unix()
	fileName := fmt.Sprintf("%s/%s/%s_%d%s", 
		req.Folder, 
		req.UserID, 
		req.DocumentType, 
		timestamp, 
		ext)
	
	// Create object in bucket
	obj := s.bucket.Object(fileName)
	
	// Create writer
	writer := obj.NewWriter(ctx)
	writer.ContentType = req.Header.Header.Get("Content-Type")
	writer.Metadata = map[string]string{
		"user_id":       req.UserID,
		"document_type": req.DocumentType,
		"original_name": req.Header.Filename,
		"uploaded_at":   time.Now().Format(time.RFC3339),
	}
	
	// Copy file data to writer
	if _, err := io.Copy(writer, req.File); err != nil {
		writer.Close()
		return nil, fmt.Errorf("error copying file data: %v", err)
	}
	
	// Close writer
	if err := writer.Close(); err != nil {
		return nil, fmt.Errorf("error closing writer: %v", err)
	}
	
	// Make file public (optional - you might want to keep it private)
	if err := obj.ACL().Set(ctx, storage.AllUsers, storage.RoleReader); err != nil {
		// Log warning but don't fail the upload
		fmt.Printf("Warning: failed to set public ACL: %v\n", err)
	}
	
	return &FileUploadResponse{
		FileURL:    fmt.Sprintf("https://storage.googleapis.com/bookstore-59884.appspot.com/%s", fileName),
		FileName:   req.Header.Filename,
		FileSize:   req.Header.Size,
		MimeType:   req.Header.Header.Get("Content-Type"),
		UploadedAt: time.Now().Format(time.RFC3339),
	}, nil
}

// UploadAvatar uploads user avatar to Firebase Storage
func (s *FirebaseStorageServiceReal) UploadAvatar(ctx context.Context, file multipart.File, header *multipart.FileHeader, userID string) (*FileUploadResponse, error) {
	return s.UploadFile(ctx, FileUploadRequest{
		File:        file,
		Header:      header,
		Folder:      "avatars",
		UserID:      userID,
		DocumentType: "avatar",
	})
}

// UploadDocument uploads user document to Firebase Storage
func (s *FirebaseStorageServiceReal) UploadDocument(ctx context.Context, file multipart.File, header *multipart.FileHeader, userID, documentType string) (*FileUploadResponse, error) {
	return s.UploadFile(ctx, FileUploadRequest{
		File:        file,
		Header:      header,
		Folder:      "documents",
		UserID:      userID,
		DocumentType: documentType,
	})
}

// DeleteFile deletes a file from Firebase Storage
func (s *FirebaseStorageServiceReal) DeleteFile(ctx context.Context, fileURL string) error {
	// Extract object name from URL
	// URL format: https://storage.googleapis.com/bucket-name/path/to/file
	parts := strings.Split(fileURL, "/")
	if len(parts) < 4 {
		return fmt.Errorf("invalid file URL format")
	}
	
	objectName := strings.Join(parts[4:], "/")
	obj := s.bucket.Object(objectName)
	
	return obj.Delete(ctx)
}

// GetFileInfo gets file information from Firebase Storage
func (s *FirebaseStorageServiceReal) GetFileInfo(ctx context.Context, fileURL string) (*FileUploadResponse, error) {
	// Extract object name from URL
	parts := strings.Split(fileURL, "/")
	if len(parts) < 4 {
		return nil, fmt.Errorf("invalid file URL format")
	}
	
	objectName := strings.Join(parts[4:], "/")
	obj := s.bucket.Object(objectName)
	
	attrs, err := obj.Attrs(ctx)
	if err != nil {
		return nil, fmt.Errorf("error getting object attributes: %v", err)
	}
	
	return &FileUploadResponse{
		FileURL:    fileURL,
		FileName:   attrs.Metadata["original_name"],
		FileSize:   attrs.Size,
		MimeType:   attrs.ContentType,
		UploadedAt: attrs.Metadata["uploaded_at"],
	}, nil
}