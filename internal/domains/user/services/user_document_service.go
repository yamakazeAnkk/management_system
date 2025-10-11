package services

import (
	"context"
	"errors"
	"mime/multipart"
	"time"

	employee_interfaces "management_system/internal/domains/employee/interfaces"
	employee_types "management_system/internal/domains/employee/types"
	storage_interfaces "management_system/internal/domains/storage/interfaces"
	"management_system/internal/model"
	"management_system/internal/util"
)

var errDocumentNotFound = errors.New("document not found")

type UserDocumentService struct {
	employeeService employee_interfaces.EmployeeService
	storageService  storage_interfaces.StorageService
}

func NewUserDocumentService(employeeService employee_interfaces.EmployeeService, storageService storage_interfaces.StorageService) *UserDocumentService {
	return &UserDocumentService{
		employeeService: employeeService,
		storageService:  storageService,
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
		ID:         util.GenerateID(),
		FileName:   response.FileName,
		FileSize:   response.FileSize,
		MimeType:   response.MimeType,
		FileURL:    response.FileURL,
		UploadedAt: time.Now(),
		IsActive:   true,
	}

	// Get current employee
	employee, err := s.employeeService.GetEmployee(ctx, userID)
	if err != nil {
		// If employee not found, we should clean up the uploaded file
		s.storageService.DeleteFile(ctx, response.FileURL)
		return nil, err
	}

	// Update employee's avatar (add to documents.photo)
	employee.Documents.Photo = append(employee.Documents.Photo, documentInfo)

	// Update employee in database
	_, err = s.employeeService.UpdateEmployee(ctx, userID, employee_types.UpdateEmployeeRequest{
		Documents: &employee.Documents,
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

	// Get current employee
	employee, err := s.employeeService.GetEmployee(ctx, userID)
	if err != nil {
		// If employee not found, clean up the uploaded file
		s.storageService.DeleteFile(ctx, response.FileURL)
		return nil, err
	}

	// Update employee's documents based on document type
	switch documentType {
	case "resume":
		employee.Documents.Resume = append(employee.Documents.Resume, documentInfo)
	case "id-document":
		employee.Documents.IDDocument = append(employee.Documents.IDDocument, documentInfo)
	case "photo":
		employee.Documents.Photo = append(employee.Documents.Photo, documentInfo)
	default:
		employee.Documents.Other = append(employee.Documents.Other, documentInfo)
	}

	// Update employee in database
	_, err = s.employeeService.UpdateEmployee(ctx, userID, employee_types.UpdateEmployeeRequest{
		Documents: &employee.Documents,
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
	// Get current employee
	employee, err := s.employeeService.GetEmployee(ctx, userID)
	if err != nil {
		return err
	}

	var fileURL string
	var found bool

	// Find and remove document from employee's documents
	// Check resume array
	for i, doc := range employee.Documents.Resume {
		if doc.ID == documentID {
			fileURL = doc.FileURL
			employee.Documents.Resume = append(employee.Documents.Resume[:i], employee.Documents.Resume[i+1:]...)
			found = true
			break
		}
	}

	if !found {
		// Check idDocument array
		for i, doc := range employee.Documents.IDDocument {
			if doc.ID == documentID {
				fileURL = doc.FileURL
				employee.Documents.IDDocument = append(employee.Documents.IDDocument[:i], employee.Documents.IDDocument[i+1:]...)
				found = true
				break
			}
		}
	}

	if !found {
		// Check photo array
		for i, doc := range employee.Documents.Photo {
			if doc.ID == documentID {
				fileURL = doc.FileURL
				employee.Documents.Photo = append(employee.Documents.Photo[:i], employee.Documents.Photo[i+1:]...)
				found = true
				break
			}
		}
	}

	if !found {
		// Check other array
		for i, doc := range employee.Documents.Other {
			if doc.ID == documentID {
				fileURL = doc.FileURL
				employee.Documents.Other = append(employee.Documents.Other[:i], employee.Documents.Other[i+1:]...)
				found = true
				break
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

	// Update employee in database
	_, err = s.employeeService.UpdateEmployee(ctx, userID, employee_types.UpdateEmployeeRequest{
		Documents: &employee.Documents,
	})
	return err
}

// GetUserDocuments returns all documents for an employee
func (s *UserDocumentService) GetUserDocuments(ctx context.Context, userID string) (*model.EmployeeDocuments, error) {
	employee, err := s.employeeService.GetEmployee(ctx, userID)
	if err != nil {
		return nil, err
	}
	return &employee.Documents, nil
}
