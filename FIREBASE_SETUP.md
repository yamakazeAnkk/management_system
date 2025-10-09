# Firebase Storage Setup Guide

## Overview
This project uses Firebase Storage for file uploads (avatars, documents, etc.). All files are stored in Firebase Storage and only URLs are saved in MongoDB.

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Storage in the project

### 2. Generate Service Account Key
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Rename it to `firebase-service-account.json` or follow the pattern `*-firebase-adminsdk-*.json`
5. Place it in the project root directory

### 3. Configure Firebase Storage
1. Go to Storage in Firebase Console
2. Create a bucket if not exists
3. Update the bucket name in `internal/service/firebase_storage_service.go`:
   ```go
   bucket, err := firebaseClient.Bucket("your-bucket-name.appspot.com")
   ```

### 4. Set Storage Rules (Optional)
For development, you can set public read access:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## File Structure
```
your-project/
├── firebase-service-account.json          # Your actual service account key (ignored by git)
├── firebase-service-account.example.json  # Example file (committed to git)
├── .gitignore                             # Contains Firebase key patterns
└── internal/service/
    └── firebase_storage_service.go        # Firebase Storage service
```

## API Endpoints

### Production Routes
- `POST /files/upload/avatar/:userId` - Upload user avatar
- `POST /files/upload/document/:userId` - Upload user document
- `DELETE /files/delete` - Delete file
- `GET /files/info` - Get file info

### Test Routes
- `POST /test/upload` - Test upload file
- `POST /test/upload/avatar` - Test upload avatar
- `POST /test/upload/document` - Test upload document
- `GET /test/file-info` - Test get file info
- `DELETE /test/file` - Test delete file

## File Types Supported

### Avatar Upload
- **Allowed types:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Max size:** 5MB
- **Storage path:** `avatars/{userId}/avatar_{timestamp}.{ext}`

### Document Upload
- **Resume:** `.pdf`, `.doc`, `.docx`
- **ID Document:** `.pdf`, `.jpg`, `.jpeg`, `.png`
- **Photo:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Contract:** `.pdf`, `.doc`, `.docx`
- **Certificate:** `.pdf`, `.doc`, `.docx`
- **Other:** All supported types
- **Max size:** 10MB
- **Storage path:** `documents/{userId}/{documentType}_{timestamp}.{ext}`

## Security Notes
- Firebase service account keys are ignored by git
- Files are made publicly readable (configurable)
- File validation is enforced on both frontend and backend
- File size limits are enforced

## Troubleshooting

### Common Issues
1. **"Failed to initialize Firebase Storage"**
   - Check if service account key file exists
   - Verify the file path in `firebase_storage_service.go`
   - Ensure the key has proper permissions

2. **"Failed to upload file"**
   - Check Firebase Storage bucket name
   - Verify storage rules allow uploads
   - Check file size and type restrictions

3. **"File not found" errors**
   - Verify the file URL format
   - Check if the file exists in Firebase Storage
   - Ensure proper bucket permissions

### Testing
Use the test endpoints to verify Firebase Storage integration:
```bash
# Test basic upload
curl -X POST -F "file=@test.txt" http://localhost:8080/test/upload

# Test avatar upload
curl -X POST -F "avatar=@image.png" http://localhost:8080/test/upload/avatar

# Test document upload
curl -X POST -F "document=@resume.pdf" -F "documentType=resume" http://localhost:8080/test/upload/document
```
