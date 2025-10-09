package service

import (
	"context"
	"errors"
	"mime/multipart"
	"time"

	"management_system/internal/model"
	"management_system/internal/service/interfaces"
	"management_system/internal/util"
)

var errDocumentNotFound = errors.New("document not found")

// UpdateUserPersonalInfoRequest for updating personal info
type UpdateUserPersonalInfoRequest struct {
	PersonalInfo *model.PersonalInfo `json:"personalInfo,omitempty"`
}

// UpdateUserDocumentsRequest for updating documents
type UpdateUserDocumentsRequest struct {
	Documents *model.UserDocuments `json:"documents,omitempty"`
}

type UserDocumentService struct {
	userService     interface {
		GetUser(ctx context.Context, id string) (*model.User, error)
		UpdateUser(ctx context.Context, id string, req interfaces.UpdateUserRequest) (*model.User, error)
	}
	storageService  StorageService
}

func NewUserDocumentService(userService interface {
	GetUser(ctx context.Context, id string) (*model.User, error)
	UpdateUser(ctx context.Context, id string, req interfaces.UpdateUserRequest) (*model.User, error)
}, storageService StorageService) *UserDocumentService {
	return &UserDocumentService{
		userService:    userService,
		storageService: storageService,
	}
}

// UploadUserAvatar uploads and updates user avatar
func (s *UserDocumentService) UploadUserAvatar(ctx context.Context, userID string, file multipart.File, header *multipart.FileHeader) (*model.DocumentInfo, error) {
	// Upload to Firebase Storage
	response, err := s.storageService.UploadAvatar(ctx, file, header, userID)
	if err != nil {
		return nil, err
	}

	// Create DocumentInfo
	documentInfo := model.DocumentInfo{
		ID:          util.GenerateID(),
		FileName:    response.FileName,
		FileSize:    response.FileSize,
		MimeType:    response.MimeType,
		FileURL:     response.FileURL,
		UploadedAt:  time.Now(),
		IsActive:    true,
	}

	// Get current user
	user, err := s.userService.GetUser(ctx, userID)
	if err != nil {
		// If user not found, we should clean up the uploaded file
		s.storageService.DeleteFile(ctx, response.FileURL)
		return nil, err
	}

	// Update user's avatar in PersonalInfo
	user.PersonalInfo.AvatarURL = &documentInfo.FileURL

	// Update user in database
	_, err = s.userService.UpdateUser(ctx, userID, interfaces.UpdateUserRequest{
		PersonalInfo: &user.PersonalInfo,
	})
	if err != nil {
		// If update fails, clean up the uploaded file
		s.storageService.DeleteFile(ctx, response.FileURL)
		return nil, err
	}

	return &documentInfo, nil
}

// UploadUserDocument uploads and updates user document
func (s *UserDocumentService) UploadUserDocument(ctx context.Context, userID, documentType string, file multipart.File, header *multipart.FileHeader, description string) (*model.DocumentInfo, error) {
	// Upload to Firebase Storage
	response, err := s.storageService.UploadDocument(ctx, file, header, userID, documentType)
	if err != nil {
		return nil, err
	}

	// Create DocumentInfo
	documentInfo := model.DocumentInfo{
		ID:          util.GenerateID(),
		FileName:    response.FileName,
		FileSize:    response.FileSize,
		MimeType:    response.MimeType,
		FileURL:     response.FileURL,
		UploadedAt:  time.Now(),
		Description: description,
		IsActive:    true,
	}

	// Get current user
	user, err := s.userService.GetUser(ctx, userID)
	if err != nil {
		// If user not found, clean up the uploaded file
		s.storageService.DeleteFile(ctx, response.FileURL)
		return nil, err
	}

	// Update user's documents based on document type
	switch documentType {
	case "resume":
		user.Documents.Resume = &documentInfo
	case "id-document":
		user.Documents.IDDocument = &documentInfo
	case "photo":
		user.Documents.Photo = &documentInfo
	case "contract":
		user.Documents.Contracts = append(user.Documents.Contracts, documentInfo)
	case "certificate":
		user.Documents.Certificates = append(user.Documents.Certificates, documentInfo)
	default:
		user.Documents.Other = append(user.Documents.Other, documentInfo)
	}

	// Update user in database
	_, err = s.userService.UpdateUser(ctx, userID, interfaces.UpdateUserRequest{
		Documents: &user.Documents,
	})
	if err != nil {
		// If update fails, clean up the uploaded file
		s.storageService.DeleteFile(ctx, response.FileURL)
		return nil, err
	}

	return &documentInfo, nil
}

// DeleteUserDocument deletes a user document
func (s *UserDocumentService) DeleteUserDocument(ctx context.Context, userID, documentID string) error {
	// Get current user
	user, err := s.userService.GetUser(ctx, userID)
	if err != nil {
		return err
	}

	var fileURL string
	var found bool

	// Find and remove document from user's documents
	if user.Documents.Resume != nil && user.Documents.Resume.ID == documentID {
		fileURL = user.Documents.Resume.FileURL
		user.Documents.Resume = nil
		found = true
	} else if user.Documents.IDDocument != nil && user.Documents.IDDocument.ID == documentID {
		fileURL = user.Documents.IDDocument.FileURL
		user.Documents.IDDocument = nil
		found = true
	} else if user.Documents.Photo != nil && user.Documents.Photo.ID == documentID {
		fileURL = user.Documents.Photo.FileURL
		user.Documents.Photo = nil
		found = true
	} else {
		// Check in arrays
		for i, doc := range user.Documents.Contracts {
			if doc.ID == documentID {
				fileURL = doc.FileURL
				user.Documents.Contracts = append(user.Documents.Contracts[:i], user.Documents.Contracts[i+1:]...)
				found = true
				break
			}
		}
		if !found {
			for i, doc := range user.Documents.Certificates {
				if doc.ID == documentID {
					fileURL = doc.FileURL
					user.Documents.Certificates = append(user.Documents.Certificates[:i], user.Documents.Certificates[i+1:]...)
					found = true
					break
				}
			}
		}
		if !found {
			for i, doc := range user.Documents.Other {
				if doc.ID == documentID {
					fileURL = doc.FileURL
					user.Documents.Other = append(user.Documents.Other[:i], user.Documents.Other[i+1:]...)
					found = true
					break
				}
			}
		}
	}

	if !found {
		return errDocumentNotFound
	}

	// Delete file from Firebase Storage
	if err := s.storageService.DeleteFile(ctx, fileURL); err != nil {
		// Log error but don't fail the operation
		// The file might already be deleted or not accessible
	}

	// Update user in database
	_, err = s.userService.UpdateUser(ctx, userID, interfaces.UpdateUserRequest{
		Documents: &user.Documents,
	})
	return err
}

// GetUserDocuments returns all documents for a user
func (s *UserDocumentService) GetUserDocuments(ctx context.Context, userID string) (*model.UserDocuments, error) {
	user, err := s.userService.GetUser(ctx, userID)
	if err != nil {
		return nil, err
	}
	return &user.Documents, nil
}
