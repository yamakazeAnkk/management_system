# API Documentation - Management System

## 🌐 **Base URL**
```
http://localhost:8080
```

---

## 📋 **API Endpoints Overview**

### **1. System & Health APIs**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/` | Hello World | ❌ |
| `GET` | `/health` | Health check | ❌ |
| `GET` | `/swagger/*any` | Swagger UI | ❌ |

### **2. Debug APIs**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/debug/db-info` | Show database info | ❌ |
| `POST` | `/debug/test-write` | Test MongoDB write | ❌ |
| `POST` | `/debug/seed-admin` | Create admin user | ❌ |

---

## 🔐 **Authentication APIs**

### **Auth Endpoints** (`/auth`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/auth/register` | Register new user | `RegisterRequest` | Success message |
| `POST` | `/auth/login` | User login | `LoginRequest` | `TokenPair` |
| `POST` | `/auth/refresh` | Refresh token | `{"refreshToken": "..."}` | `TokenPair` |
| `POST` | `/auth/logout` | User logout | `{"refreshToken": "..."}` | Success message |

#### **Request/Response Types:**
```typescript
// Register Request
{
  "username": "string",
  "password": "string", 
  "fullName": "string",
  "email": "string" // optional
}

// Login Request
{
  "username": "string",
  "password": "string"
}

// Token Pair Response
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

---

## 👥 **User Management APIs**

### **User Endpoints** (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users` | Create user | ❌ |
| `GET` | `/users` | List users | ❌ |
| `GET` | `/users/:id` | Get user by ID | ❌ |
| `PUT` | `/users/:id` | Update user | ❌ |
| `DELETE` | `/users/:id` | Delete user | ❌ |
| `POST` | `/users/:id/roles` | Assign roles | ❌ |
| `DELETE` | `/users/:id/roles` | Remove roles | ❌ |
| `GET` | `/users/:id/roles` | Get user roles | ❌ |

#### **Query Parameters:**
- `limit`: Number of users per page
- `offset`: Number of users to skip
- `departmentId`: Filter by department
- `isActive`: Filter by active status
- `search`: Search term

---

## 🎭 **Role Management APIs**

### **Role Endpoints** (`/roles`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/roles` | List roles | ❌ |
| `POST` | `/roles` | Create role | ❌ |
| `GET` | `/roles/:id` | Get role by ID | ❌ |
| `PUT` | `/roles/:id` | Update role | ❌ |
| `DELETE` | `/roles/:id` | Delete role | ❌ |

---

## 📁 **File Management APIs**

### **File Upload Endpoints** (`/files`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/files/upload/avatar/:userId` | Upload user avatar | ❌ |
| `POST` | `/files/upload/document/:userId` | Upload user document | ❌ |
| `DELETE` | `/files/delete` | Delete file | ❌ |
| `GET` | `/files/info` | Get file info | ❌ |

#### **File Upload Details:**
- **Avatar**: Max 5MB, formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Documents**: Max 10MB, formats vary by type:
  - Resume/Contract/Certificate: `.pdf`, `.doc`, `.docx`
  - ID Document: `.pdf`, `.jpg`, `.jpeg`, `.png`
  - Photo: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

---

## 🧪 **Test APIs**

### **Test Upload Endpoints** (`/test`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/test/upload` | Test file upload | ❌ |
| `POST` | `/test/upload/avatar` | Test avatar upload | ❌ |
| `POST` | `/test/upload/document` | Test document upload | ❌ |
| `GET` | `/test/file-info` | Test file info | ❌ |
| `DELETE` | `/test/file` | Test file deletion | ❌ |

---

## 🔒 **Protected APIs**

### **Protected Endpoints** (`/api`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/me` | Get current user info | ✅ |

**Note**: Protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

---

## 📊 **Response Formats**

### **Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

### **Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "errors": {
    "field": ["validation error"]
  }
}
```

### **Pagination Response:**
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "hasNext": true,
  "hasPrev": false
}
```

---

## 🚀 **Quick Start**

### **1. Start Server:**
```bash
go run cmd/api/main.go
```

### **2. Test Health:**
```bash
curl http://localhost:8080/health
```

### **3. Create Admin User:**
```bash
curl -X POST http://localhost:8080/debug/seed-admin
```

### **4. Login:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

### **5. Access Protected Route:**
```bash
curl http://localhost:8080/api/me \
  -H "Authorization: Bearer <access_token>"
```

---

## 📝 **Notes**

- **CORS**: Enabled for `http://localhost:5173` (frontend)
- **File Storage**: Firebase Storage (with mock fallback)
- **Database**: MongoDB
- **Authentication**: JWT with refresh tokens
- **Documentation**: Swagger UI available at `/swagger/index.html`

---

## ✅ **Status: All APIs Working**

All endpoints are functional with domain-based architecture! 🎉
