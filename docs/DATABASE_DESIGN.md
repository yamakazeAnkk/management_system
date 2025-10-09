# Database Design - User & Role Management System

## Overview
This document outlines the redesigned database schema for a comprehensive user and role management system.

## Collections Structure

### 1. Users Collection
```json
{
  "_id": "ObjectId",
  "employeeId": "string", // EMP001, EMP002, etc.
  "username": "string",
  "passwordHash": "string",
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "dateOfBirth": "Date",
    "gender": "string", // male, female, other
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "country": "string",
      "postalCode": "string"
    },
    "avatarUrl": "string"
  },
  "employmentInfo": {
    "departmentId": "ObjectId",
    "position": "string",
    "jobTitle": "string",
    "managerId": "ObjectId",
    "employmentType": "string", // full-time, part-time, contract
    "workLocation": "string",
    "joinDate": "Date",
    "salary": {
      "amount": "number",
      "currency": "string",
      "type": "string", // monthly, hourly, annual
      "isConfidential": "boolean"
    },
    "benefits": ["string"],
    "bonusEligible": "boolean"
  },
  "professionalInfo": {
    "skills": ["string"],
    "certifications": ["string"],
    "education": [{
      "degree": "string",
      "institution": "string",
      "year": "number"
    }],
    "languages": ["string"]
  },
  "emergencyContact": {
    "name": "string",
    "relationship": "string",
    "phone": "string",
    "email": "string"
  },
  "status": {
    "isActive": "boolean",
    "status": "string", // active, inactive, on-leave, terminated
    "lastActiveAt": "Date"
  },
  "securitySettings": {
    "requireTwoFactor": "boolean",
    "passwordChangedAt": "Date",
    "lastLoginAt": "Date",
    "loginAttempts": "number",
    "lockedUntil": "Date"
  },
  "metadata": {
    "createdAt": "Date",
    "updatedAt": "Date",
    "createdBy": "ObjectId",
    "updatedBy": "ObjectId"
  }
}
```

### 2. Roles Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "code": "string", // ROLE_ADMIN, ROLE_HR_MANAGER, etc.
  "description": "string",
  "category": "string", // system, business, department
  "isSystem": "boolean",
  "isActive": "boolean",
  "hierarchy": {
    "level": "number", // 1=entry, 2=associate, 3=lead, 4=manager, 5=director, 6=c-level
    "reportsTo": "ObjectId", // reference to parent role
    "departmentScope": "string" // all, specific, none
  },
  "permissions": {
    "permissionIds": ["ObjectId"],
    "inheritedFrom": ["ObjectId"], // parent roles
    "customPermissions": ["string"] // additional permissions
  },
  "securitySettings": {
    "requireTwoFactor": "boolean",
    "allowApiAccess": "boolean",
    "sessionTimeout": "number", // minutes
    "maxConcurrentSessions": "number"
  },
  "usage": {
    "userCount": "number",
    "lastAssignedAt": "Date"
  },
  "metadata": {
    "createdAt": "Date",
    "updatedAt": "Date",
    "createdBy": "ObjectId",
    "updatedBy": "ObjectId"
  }
}
```

### 3. UserRoles Collection (Junction Table)
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "roleId": "ObjectId",
  "assignmentType": "string", // primary, secondary, temporary
  "scope": {
    "departmentId": "ObjectId", // null = organization-wide
    "locationCode": "string",
    "projectIds": ["ObjectId"]
  },
  "effectiveDates": {
    "assignedAt": "Date",
    "effectiveFrom": "Date",
    "effectiveTo": "Date" // null = permanent
  },
  "assignedBy": "ObjectId",
  "notes": "string",
  "isActive": "boolean",
  "metadata": {
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

### 4. Permissions Collection
```json
{
  "_id": "ObjectId",
  "key": "string", // employee.read, employee.create, etc.
  "name": "string",
  "description": "string",
  "module": "string", // employee, recruitment, attendance, etc.
  "resource": "string", // employee, job, candidate, etc.
  "action": "string", // read, create, update, delete, export, etc.
  "category": "string", // crud, reporting, system, etc.
  "isSystem": "boolean",
  "isActive": "boolean",
  "dependencies": ["string"], // other permission keys required
  "metadata": {
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

### 5. Departments Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "code": "string", // HR, IT, FINANCE, etc.
  "description": "string",
  "parentDepartmentId": "ObjectId", // for hierarchy
  "managerId": "ObjectId",
  "budgetCode": "string",
  "location": "string",
  "contactInfo": {
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "isActive": "boolean",
  "metadata": {
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

### 6. UserActivity Collection (Audit Log)
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "action": "string", // login, logout, password_change, role_assigned, etc.
  "resource": "string", // user, role, permission, etc.
  "resourceId": "ObjectId",
  "details": "object",
  "ipAddress": "string",
  "userAgent": "string",
  "location": "string",
  "timestamp": "Date",
  "outcome": "string" // success, failure, error
}
```

### 7. RefreshTokens Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "tokenHash": "string",
  "deviceInfo": {
    "deviceId": "string",
    "deviceName": "string",
    "platform": "string",
    "userAgent": "string"
  },
  "location": {
    "ipAddress": "string",
    "country": "string",
    "city": "string"
  },
  "expiresAt": "Date",
  "isRevoked": "boolean",
  "revokedAt": "Date",
  "revokedBy": "ObjectId",
  "revokedReason": "string",
  "metadata": {
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Key Improvements

### 1. Enhanced User Profile
- Complete personal information
- Detailed employment information
- Professional skills and certifications
- Emergency contact information
- Comprehensive security settings

### 2. Improved Role Management
- Role hierarchy with parent-child relationships
- Department-specific scoping
- Flexible permission inheritance
- Security settings per role

### 3. Flexible User-Role Assignment
- Multiple roles per user (primary/secondary)
- Time-bound assignments
- Department/location scoping
- Assignment tracking and audit

### 4. Comprehensive Permission System
- Granular permissions with resource-action model
- Permission dependencies
- Module-based organization
- System vs custom permissions

### 5. Enhanced Security & Audit
- Detailed user activity tracking
- Device and location tracking
- Token management with revocation
- Comprehensive audit trail

### 6. Department Hierarchy
- Support for organizational structure
- Department managers and budgets
- Parent-child relationships

## Indexes

### Users Collection
- `{ "username": 1 }` - unique
- `{ "employeeId": 1 }` - unique
- `{ "personalInfo.email": 1 }` - unique
- `{ "employmentInfo.departmentId": 1 }`
- `{ "employmentInfo.managerId": 1 }`
- `{ "status.isActive": 1 }`

### UserRoles Collection
- `{ "userId": 1, "roleId": 1 }` - compound
- `{ "userId": 1, "isActive": 1 }`
- `{ "roleId": 1, "isActive": 1 }`
- `{ "scope.departmentId": 1 }`

### Roles Collection
- `{ "code": 1 }` - unique
- `{ "hierarchy.level": 1 }`
- `{ "isActive": 1 }`

### Permissions Collection
- `{ "key": 1 }` - unique
- `{ "module": 1 }`
- `{ "resource": 1, "action": 1 }`

## Migration Strategy

1. **Phase 1**: Create new collections alongside existing ones
2. **Phase 2**: Migrate data with data transformation
3. **Phase 3**: Update application code to use new schema
4. **Phase 4**: Remove old collections after validation

## Benefits

1. **Scalability**: Better support for large organizations
2. **Flexibility**: Support for complex organizational structures
3. **Security**: Enhanced audit and security features
4. **Maintainability**: Cleaner separation of concerns
5. **Performance**: Optimized indexes for common queries
6. **Compliance**: Better support for regulatory requirements
