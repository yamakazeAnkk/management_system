package types

type FileUploadResponse struct {
	FileURL    string `json:"fileUrl"`
	FileName   string `json:"fileName"`
	FileSize   int64  `json:"fileSize"`
	MimeType   string `json:"mimeType"`
	UploadedAt string `json:"uploadedAt"`
}
