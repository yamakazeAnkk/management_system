# Migration Guide - Enhanced User & Role Management System

## Overview
This guide outlines the migration from the current database schema to the new enhanced user and role management system.

## Key Changes

### 1. User Model Changes

#### Before (Current)
```go
type User struct {
    ID            UUID       `bson:"_id"`
    Username      string     `bson:"username"`
    PasswordHash  string     `bson:"passwordHash"`
    FullName      string     `bson:"fullName"`
    Email         *string    `bson:"email,omitempty"`
    Phone         *string    `bson:"phone,omitempty"`
    DepartmentID  *UUID      `bson:"departmentId,omitempty"`
    PositionLevel *int32     `bson:"positionLevel,omitempty"`
    LocationCode  *string    `bson:"locationCode,omitempty"`
    IsActive      bool       `bson:"isActive"`
    CreatedAt     time.Time  `bson:"createdAt"`
    UpdatedAt     time.Time  `bson:"updatedAt"`
    AvatarURL     *string    `bson:"avatarUrl,omitempty"`
    Roles         []UserRole `bson:"roles"`
}
```

#### After (New)
```go
type User struct {
    ID                UUID            `bson:"_id"`
    EmployeeID        string          `bson:"employeeId"`
    Username          string          `bson:"username"`
    PasswordHash      string          `bson:"passwordHash"`
    PersonalInfo      PersonalInfo    `bson:"personalInfo"`
    EmploymentInfo    EmploymentInfo  `bson:"employmentInfo"`
    ProfessionalInfo  ProfessionalInfo `bson:"professionalInfo"`
    EmergencyContact  EmergencyContact `bson:"emergencyContact"`
    Status            UserStatus      `bson:"status"`
    SecuritySettings  SecuritySettings `bson:"securitySettings"`
    Metadata          UserMetadata    `bson:"metadata"`
}
```

### 2. Role Model Changes

#### Before (Current)
```go
type Role struct {
    ID             UUID      `bson:"_id"`
    Name           string    `bson:"name"`
    Description    *string   `bson:"description,omitempty"`
    IsSystem       bool      `bson:"isSystem"`
    IsActive       bool      `bson:"isActive"`
    CreatedAt      time.Time `bson:"createdAt"`
    UpdatedAt      time.Time `bson:"updatedAt"`
    PermissionKeys []string  `bson:"permissionKeys"`
}
```

#### After (New)
```go
type Role struct {
    ID               UUID                `bson:"_id"`
    Name             string              `bson:"name"`
    Code             string              `bson:"code"`
    Description      string              `bson:"description"`
    Category         string              `bson:"category"`
    IsSystem         bool                `bson:"isSystem"`
    IsActive         bool                `bson:"isActive"`
    Hierarchy        RoleHierarchy       `bson:"hierarchy"`
    Permissions      RolePermissions     `bson:"permissions"`
    SecuritySettings RoleSecuritySettings `bson:"securitySettings"`
    Usage            RoleUsage           `bson:"usage"`
    Metadata         RoleMetadata        `bson:"metadata"`
}
```

### 3. UserRole Model Changes

#### Before (Current)
```go
type UserRole struct {
    RoleID            UUID      `bson:"roleId"`
    ScopeDepartmentID *UUID     `bson:"scopeDepartmentId,omitempty"`
    AssignedAt        time.Time `bson:"assignedAt"`
}
```

#### After (New)
```go
type UserRole struct {
    ID             UUID                `bson:"_id"`
    UserID         UUID                `bson:"userId"`
    RoleID         UUID                `bson:"roleId"`
    AssignmentType string              `bson:"assignmentType"`
    Scope          UserRoleScope       `bson:"scope"`
    EffectiveDates UserRoleDates       `bson:"effectiveDates"`
    AssignedBy     *UUID               `bson:"assignedBy,omitempty"`
    Notes          string              `bson:"notes"`
    IsActive       bool                `bson:"isActive"`
    Metadata       UserRoleMetadata    `bson:"metadata"`
}
```

## Migration Steps

### Phase 1: Data Preparation

1. **Backup Current Data**
   ```bash
   mongodump --db your_database_name --out backup_$(date +%Y%m%d)
   ```

2. **Create Migration Scripts**
   - Create scripts to transform existing data
   - Validate data integrity before migration

### Phase 2: Database Schema Migration

1. **Create New Collections**
   ```javascript
   // Create indexes for new collections
   db.users.createIndex({ "username": 1 }, { unique: true })
   db.users.createIndex({ "employeeId": 1 }, { unique: true })
   db.users.createIndex({ "personalInfo.email": 1 }, { unique: true })
   db.userRoles.createIndex({ "userId": 1, "roleId": 1 })
   db.roles.createIndex({ "code": 1 }, { unique: true })
   ```

2. **Data Transformation Script**
   ```javascript
   // Example migration script for users
   db.users_old.find().forEach(function(oldUser) {
       var newUser = {
           _id: oldUser._id,
           employeeId: "EMP" + oldUser._id.toString().slice(-3),
           username: oldUser.username,
           passwordHash: oldUser.passwordHash,
           personalInfo: {
               firstName: oldUser.fullName.split(' ')[0] || '',
               lastName: oldUser.fullName.split(' ').slice(1).join(' ') || '',
               fullName: oldUser.fullName,
               email: oldUser.email || '',
               phone: oldUser.phone,
               address: {
                   street: '',
                   city: '',
                   state: '',
                   country: '',
                   postalCode: ''
               },
               avatarUrl: oldUser.avatarUrl
           },
           employmentInfo: {
               departmentId: oldUser.departmentId,
               position: '',
               jobTitle: '',
               employmentType: 'full-time',
               workLocation: oldUser.locationCode || '',
               joinDate: oldUser.createdAt,
               salary: {
                   amount: 0,
                   currency: 'USD',
                   type: 'monthly',
                   isConfidential: false
               },
               benefits: [],
               bonusEligible: false
           },
           professionalInfo: {
               skills: [],
               certifications: [],
               education: [],
               languages: []
           },
           emergencyContact: {
               name: '',
               relationship: '',
               phone: '',
               email: ''
           },
           status: {
               isActive: oldUser.isActive,
               status: oldUser.isActive ? 'active' : 'inactive'
           },
           securitySettings: {
               requireTwoFactor: false,
               loginAttempts: 0
           },
           metadata: {
               createdAt: oldUser.createdAt,
               updatedAt: oldUser.updatedAt
           }
       };
       
       db.users.insertOne(newUser);
   });
   ```

### Phase 3: Application Code Updates

1. **Update Repository Interfaces**
   ```go
   // Update user repository methods
   type UserRepository interface {
       Create(ctx context.Context, user *model.User) error
       GetByID(ctx context.Context, id model.UUID) (*model.User, error)
       GetByUsername(ctx context.Context, username string) (*model.User, error)
       GetByEmployeeID(ctx context.Context, employeeID string) (*model.User, error)
       Update(ctx context.Context, user *model.User) error
       Delete(ctx context.Context, id model.UUID) error
       List(ctx context.Context, filter UserFilter) ([]*model.User, int64, error)
   }
   ```

2. **Update Service Layer**
   ```go
   // Update user service methods
   type UserService interface {
       CreateUser(ctx context.Context, req *dto.CreateUserRequest) (*model.User, error)
       GetUser(ctx context.Context, id string) (*model.User, error)
       UpdateUser(ctx context.Context, id string, req *dto.UpdateUserRequest) (*model.User, error)
       AssignRoles(ctx context.Context, userID string, roleIDs []string) error
       GetUserRoles(ctx context.Context, userID string) ([]*model.UserRole, error)
   }
   ```

3. **Update API Handlers**
   ```go
   // Update HTTP handlers to use new user structure
   func (h *UserHandler) CreateUser(c *gin.Context) {
       var req dto.CreateUserRequest
       if err := c.ShouldBindJSON(&req); err != nil {
           c.JSON(400, gin.H{"error": err.Error()})
           return
       }
       
       user, err := h.userService.CreateUser(c.Request.Context(), &req)
       if err != nil {
           c.JSON(500, gin.H{"error": err.Error()})
           return
       }
       
       c.JSON(201, user)
   }
   ```

### Phase 4: Frontend Updates

1. **Update TypeScript Types**
   ```typescript
   // Update components to use new user structure
   interface UserFormProps {
       user?: User;
       onSubmit: (user: CreateUserRequest | UpdateUserRequest) => void;
   }
   
   const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
       const [formData, setFormData] = useState<CreateUserRequest>({
           username: '',
           employeeId: '',
           personalInfo: {
               firstName: '',
               lastName: '',
               email: '',
               address: {
                   street: '',
                   city: '',
                   state: '',
                   country: '',
                   postalCode: ''
               }
           },
           // ... other fields
       });
       
       // Form implementation
   };
   ```

2. **Update API Services**
   ```typescript
   // Update API service methods
   export const userService = {
       async createUser(userData: CreateUserRequest): Promise<User> {
           const response = await api.post('/users', userData);
           return response.data;
       },
       
       async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
           const response = await api.put(`/users/${id}`, userData);
           return response.data;
       },
       
       async assignRoles(userId: string, roleIds: string[]): Promise<void> {
           await api.post(`/users/${userId}/roles`, { roleIds });
       }
   };
   ```

### Phase 5: Testing & Validation

1. **Unit Tests**
   ```go
   func TestUserService_CreateUser(t *testing.T) {
       // Test user creation with new structure
       req := &dto.CreateUserRequest{
           Username: "testuser",
           EmployeeID: "EMP001",
           PersonalInfo: model.PersonalInfo{
               FirstName: "John",
               LastName: "Doe",
               Email: "john.doe@example.com",
               // ... other fields
           },
           // ... other fields
       }
       
       user, err := userService.CreateUser(context.Background(), req)
       assert.NoError(t, err)
       assert.Equal(t, "EMP001", user.EmployeeID)
   }
   ```

2. **Integration Tests**
   ```go
   func TestUserAPI_CreateUser(t *testing.T) {
       // Test API endpoints with new user structure
       reqBody := map[string]interface{}{
           "username": "testuser",
           "employeeId": "EMP001",
           "personalInfo": map[string]interface{}{
               "firstName": "John",
               "lastName": "Doe",
               "email": "john.doe@example.com",
               // ... other fields
           },
           // ... other fields
       }
       
       w := httptest.NewRecorder()
       req, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(jsonBody))
       router.ServeHTTP(w, req)
       
       assert.Equal(t, 201, w.Code)
   }
   ```

### Phase 6: Deployment

1. **Staged Deployment**
   - Deploy backend changes first
   - Test API endpoints
   - Deploy frontend changes
   - Monitor for issues

2. **Rollback Plan**
   - Keep old collections for rollback
   - Monitor application logs
   - Have rollback scripts ready

## Validation Checklist

- [ ] All user data migrated correctly
- [ ] Role assignments preserved
- [ ] Permission system working
- [ ] API endpoints responding correctly
- [ ] Frontend forms working with new structure
- [ ] Authentication/authorization working
- [ ] Performance acceptable
- [ ] No data loss
- [ ] All tests passing

## Post-Migration Tasks

1. **Cleanup**
   - Remove old collections after validation
   - Update documentation
   - Train team on new structure

2. **Monitoring**
   - Monitor application performance
   - Watch for errors
   - Collect user feedback

3. **Optimization**
   - Optimize database queries
   - Add missing indexes if needed
   - Fine-tune application performance

## Support

For questions or issues during migration:
1. Check migration logs
2. Review error messages
3. Consult team documentation
4. Contact system administrator
