package types

import "mime/multipart"

type FileUploadRequest struct {
	File         multipart.File
	Header       *multipart.FileHeader
	Folder       string // e.g., "avatars", "documents", "resumes"
	UserID       string
	DocumentType string // e.g., "resume", "id-document", "photo"
}
