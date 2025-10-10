# Proper PATCH Implementation: Full Stack ✅

## 🎯 **Problem Identified:**
> "Hình như code phần service với repository chưa có logic của patch đúng ko"

**Bạn đúng hoàn toàn!** Trước đây tôi chỉ implement PATCH ở handler level, nhưng service và repository vẫn dùng PUT logic.

---

## 🔧 **Complete Implementation:**

### **1. Repository Layer (MongoDB):**

#### **Added PartialUpdate Method:**
```go
func (r *MongoBaseRepository[T]) PartialUpdate(ctx context.Context, id string, updates map[string]interface{}) error {
    oid, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return errors.New("invalid id")
    }

    // Add updatedAt timestamp
    updates["metadata.updatedAt"] = time.Now()

    // Use $set operator for partial updates
    _, err = r.col.UpdateOne(ctx, bson.M{"_id": oid}, bson.M{"$set": updates})
    return err
}
```

#### **Updated Interface:**
```go
type BaseRepository[T any] interface {
    Create(ctx context.Context, data T) error
    GetByID(ctx context.Context, id string) (T, error)
    Update(ctx context.Context, id string, data T) error
    PartialUpdate(ctx context.Context, id string, updates map[string]interface{}) error  // ✅ NEW
    Delete(ctx context.Context, id string) error
    List(ctx context.Context, filter map[string]interface{}, limit int, offset int) ([]T, error)
    Count(ctx context.Context, filter map[string]interface{}) (int64, error)
}
```

### **2. Service Layer (Domain Logic):**

#### **Added PartialUpdateUser Method:**
```go
func (s *userService) PartialUpdateUser(ctx context.Context, id string, updates map[string]interface{}) (*model.User, error) {
    // Build MongoDB update document
    mongoUpdates := make(map[string]interface{})
    
    // Map frontend fields to MongoDB fields
    for key, value := range updates {
        switch key {
        case "username":
            mongoUpdates["username"] = value
        case "personalInfo":
            if personalInfo, ok := value.(map[string]interface{}); ok {
                for pKey, pValue := range personalInfo {
                    mongoUpdates["personalInfo."+pKey] = pValue
                }
            }
        case "employmentInfo":
            if employmentInfo, ok := value.(map[string]interface{}); ok {
                for eKey, eValue := range employmentInfo {
                    mongoUpdates["employmentInfo."+eKey] = eValue
                }
            }
        // ... other fields
        }
    }
    
    // Perform partial update
    if err := s.users.PartialUpdate(ctx, id, mongoUpdates); err != nil {
        return nil, err
    }
    
    // Return updated user
    user, err := s.users.GetByID(ctx, id)
    return &user, nil
}
```

#### **Updated Interface:**
```go
type UserService interface {
    CreateUser(ctx context.Context, req types.CreateUserRequest) (*model.User, error)
    GetUser(ctx context.Context, id string) (*model.User, error)
    UpdateUser(ctx context.Context, id string, req types.UpdateUserRequest) (*model.User, error)
    PartialUpdateUser(ctx context.Context, id string, updates map[string]interface{}) (*model.User, error)  // ✅ NEW
    DeleteUser(ctx context.Context, id string) error
    // ... other methods
}
```

### **3. Handler Layer (API):**

#### **Simplified PartialUpdateUser:**
```go
func (h *UserHandler) PartialUpdateUser(c *gin.Context) {
    id := c.Param("id")
    
    // Verify user exists
    _, err := h.userService.GetUser(c.Request.Context(), id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
        return
    }

    // Parse partial update data
    var partialData map[string]interface{}
    if err := c.ShouldBindJSON(&partialData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Use proper partial update service method
    user, err := h.userService.PartialUpdateUser(c.Request.Context(), id, partialData)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, user)
}
```

---

## 📊 **Before vs After:**

### **Before (Incomplete):**
- ❌ **Repository**: Only `Update()` (full replacement)
- ❌ **Service**: Only `UpdateUser()` (full replacement)
- ❌ **Handler**: Complex conversion logic
- ❌ **Database**: `$set` with full document

### **After (Complete):**
- ✅ **Repository**: `PartialUpdate()` with `$set` operator
- ✅ **Service**: `PartialUpdateUser()` with field mapping
- ✅ **Handler**: Simple, clean logic
- ✅ **Database**: Efficient partial updates

---

## 🎯 **Key Benefits:**

### **1. True Partial Updates:**
```json
PATCH /users/123
{
  "personalInfo": {
    "email": "new@email.com"
  }
}
```
**MongoDB Query:**
```javascript
db.users.updateOne(
  {_id: ObjectId("...")},
  {
    $set: {
      "personalInfo.email": "new@email.com",
      "metadata.updatedAt": ISODate("...")
    }
  }
)
```

### **2. Efficient Database Operations:**
- ✅ **Only changed fields** are updated
- ✅ **Atomic updates** using `$set`
- ✅ **Automatic timestamp** updates
- ✅ **No full document replacement**

### **3. Clean Architecture:**
- ✅ **Repository**: Database-specific logic
- ✅ **Service**: Business logic and field mapping
- ✅ **Handler**: HTTP-specific logic
- ✅ **Separation of concerns**

---

## 🚀 **Example Usage:**

### **Frontend Form Update:**
```javascript
// Update only user's email
const updateUserEmail = async (userId, newEmail) => {
  await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalInfo: {
        email: newEmail
      }
    })
  });
};
```

### **Mobile App Sync:**
```javascript
// Sync only changed fields
const syncUserChanges = async (userId, changes) => {
  await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(changes)  // Only changed fields
  });
};
```

---

## 📋 **Supported Partial Updates:**

### **1. Basic Fields:**
```json
{
  "username": "newusername"
}
```

### **2. Nested Objects:**
```json
{
  "personalInfo": {
    "firstName": "John",
    "email": "john@company.com"
  },
  "employmentInfo": {
    "position": "Senior Developer"
  }
}
```

### **3. Arrays:**
```json
{
  "professionalInfo": {
    "skills": ["Go", "React", "MongoDB"]
  }
}
```

---

## ✅ **Result:**

**Now we have TRUE PATCH implementation:**
- ✅ **Repository**: Proper `$set` operations
- ✅ **Service**: Field mapping and business logic
- ✅ **Handler**: Clean API interface
- ✅ **Database**: Efficient partial updates

**Perfect full-stack PATCH implementation!** 🎯✨

---

## 💡 **Key Learning:**

**PATCH requires implementation at ALL layers:**
1. **Repository**: Database partial update operations
2. **Service**: Business logic and field mapping
3. **Handler**: HTTP request handling

**Not just the API endpoint!** 🚀
