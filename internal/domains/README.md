# Domain-Driven Architecture

Cấu trúc này được tổ chức theo **Domain-Driven Design (DDD)** thay vì theo technical layers.

## 📁 Cấu Trúc Mới

```
internal/domains/
├── auth/                    # Authentication Domain
│   ├── interfaces/
│   │   └── auth_service.go  # Auth service interface
│   ├── services/
│   │   └── auth_service.go  # Auth service implementation
│   └── types/
│       ├── requests.go      # Auth request types
│       └── responses.go     # Auth response types
├── user/                    # User Management Domain
│   ├── interfaces/
│   │   └── user_service.go  # User service interface
│   ├── services/
│   │   └── user_document_service.go # User document service
│   └── types/
│       └── requests.go      # User request types
├── role/                    # Role Management Domain
│   ├── interfaces/
│   │   └── role_service.go  # Role service interface
│   └── services/            # Role service implementations
└── storage/                 # File Storage Domain
    ├── interfaces/
    │   └── storage_service.go # Storage service interface
    ├── services/
    │   ├── firebase_storage_service.go      # Mock storage
    │   └── firebase_storage_service_real.go # Real storage
    └── types/
        ├── requests.go      # Storage request types
        └── responses.go     # Storage response types
```

## ✅ Lợi Ích

1. **Domain Cohesion**: Tất cả code liên quan đến 1 domain ở cùng chỗ
2. **Clear Boundaries**: Mỗi domain có interface và types riêng
3. **Easy Navigation**: Dễ tìm code theo business domain
4. **Independent Development**: Các team có thể work trên domain riêng
5. **Better Testing**: Test theo domain, không theo technical layer

## 🔄 Migration Status

- ✅ Auth Domain: Moved
- ✅ User Domain: Moved  
- ✅ Storage Domain: Moved
- ✅ Role Domain: Moved
- ⏳ Import Updates: Pending

## 📝 Next Steps

1. Update all import paths in handlers, main.go, etc.
2. Update dependency injection
3. Remove old service files
4. Update tests
