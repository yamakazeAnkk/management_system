package services

import (
	"context"
	"errors"
	"time"

	"management_system/internal/domains/user/interfaces"
	"management_system/internal/domains/user/types"
	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
	autil "management_system/internal/util/auth"
)

type userService struct {
	users     repoif.UserRepository
	userRoles repoif.BaseRepository[model.UserRole]
	roles     repoif.BaseRepository[model.Role]
}

func NewUserService(
	users repoif.UserRepository,
	userRoles repoif.BaseRepository[model.UserRole],
	roles repoif.BaseRepository[model.Role],
) interfaces.UserService {
	return &userService{
		users:     users,
		userRoles: userRoles,
		roles:     roles,
	}
}

func (s *userService) CreateUser(ctx context.Context, req types.CreateUserRequest) (*model.User, error) {
	// Check if username already exists
	existingUser, err := s.users.FindByUsername(ctx, req.Username)
	if err == nil && existingUser != nil {
		return nil, errors.New("username already exists")
	}

	// Hash password
	hashedPassword, err := autil.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	// Create user
	user := model.User{
		ID:           model.NewUUID(),
		EmployeeID:   req.EmployeeID,
		Username:     req.Username,
		PasswordHash: hashedPassword,
		PersonalInfo:     req.PersonalInfo,
		EmploymentInfo:   req.EmploymentInfo,
		ProfessionalInfo: req.ProfessionalInfo,
		EmergencyContact: req.EmergencyContact,
		Documents:        *req.Documents,
		Status: model.UserStatus{
			IsActive: true,
			Status:   "active",
		},
		SecuritySettings: model.SecuritySettings{
			RequireTwoFactor: false,
			LoginAttempts:    0,
		},
		Metadata: model.UserMetadata{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	if err := s.users.Create(ctx, user); err != nil {
		return nil, err
	}

	// Assign roles if provided
	if len(req.RoleIDs) > 0 {
		if err := s.AssignRoles(ctx, user.ID.Hex(), req.RoleIDs); err != nil {
			// If role assignment fails, we might want to rollback user creation
			// For now, just log the error
			// TODO: Implement transaction rollback
		}
	}

	return &user, nil
}

func (s *userService) GetUser(ctx context.Context, id string) (*model.User, error) {
	user, err := s.users.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *userService) GetUserByUsername(ctx context.Context, username string) (*model.User, error) {
	return s.users.FindByUsername(ctx, username)
}

func (s *userService) GetUserByEmployeeID(ctx context.Context, employeeID string) (*model.User, error) {
	return s.users.FindByEmployeeID(ctx, employeeID)
}

func (s *userService) UpdateUser(ctx context.Context, id string, req types.UpdateUserRequest) (*model.User, error) {
	// Get existing user
	userData, err := s.users.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	user := &userData

	// Update fields if provided
	if req.Username != nil {
		user.Username = *req.Username
	}
	if req.PersonalInfo != nil {
		user.PersonalInfo = *req.PersonalInfo
	}
	if req.EmploymentInfo != nil {
		user.EmploymentInfo = *req.EmploymentInfo
	}
	if req.ProfessionalInfo != nil {
		user.ProfessionalInfo = *req.ProfessionalInfo
	}
	if req.EmergencyContact != nil {
		user.EmergencyContact = *req.EmergencyContact
	}
	if req.Documents != nil {
		user.Documents = *req.Documents
	}
	if req.Status != nil {
		user.Status = *req.Status
	}

	user.Metadata.UpdatedAt = time.Now()

	if err := s.users.Update(ctx, id, *user); err != nil {
		return nil, err
	}

	// Update roles if provided
	if len(req.RoleIDs) > 0 {
		// Remove existing roles
		if err := s.RemoveAllRoles(ctx, id); err != nil {
			return nil, err
		}
		// Assign new roles
		if err := s.AssignRoles(ctx, id, req.RoleIDs); err != nil {
			return nil, err
		}
	}

	return user, nil
}

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
		case "professionalInfo":
			if professionalInfo, ok := value.(map[string]interface{}); ok {
				for prKey, prValue := range professionalInfo {
					mongoUpdates["professionalInfo."+prKey] = prValue
				}
			}
		case "status":
			if status, ok := value.(map[string]interface{}); ok {
				for sKey, sValue := range status {
					mongoUpdates["status."+sKey] = sValue
				}
			}
		default:
			mongoUpdates[key] = value
		}
	}
	
	// Perform partial update
	if err := s.users.PartialUpdate(ctx, id, mongoUpdates); err != nil {
		return nil, err
	}
	
	// Return updated user
	user, err := s.users.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *userService) DeleteUser(ctx context.Context, id string) error {
	return s.users.Delete(ctx, id)
}

func (s *userService) ListUsers(ctx context.Context, filter types.UserFilter, limit, offset int) ([]*model.User, int64, error) {
	// Build query filter
	query := make(map[string]interface{})
	
	if filter.DepartmentID != nil {
		query["employmentInfo.departmentId"] = *filter.DepartmentID
	}
	if filter.IsActive != nil {
		query["status.isActive"] = *filter.IsActive
	}
	if filter.EmployeeID != nil {
		query["employeeId"] = *filter.EmployeeID
	}

	userList, err := s.users.List(ctx, query, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	// Get total count
	total, err := s.users.Count(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	// Convert []model.User to []*model.User
	users := make([]*model.User, len(userList))
	for i, u := range userList {
		users[i] = &u
	}

	return users, total, nil
}

func (s *userService) AssignRoles(ctx context.Context, userID string, roleIDs []string) error {
	for _, roleID := range roleIDs {
		userRole := model.UserRole{
			ID:     model.NewUUID(),
			UserID: model.NewUUIDFromString(userID),
			RoleID: model.NewUUIDFromString(roleID),
			AssignmentType: "primary",
			EffectiveDates: model.UserRoleDates{
				AssignedAt:    time.Now(),
				EffectiveFrom: time.Now(),
			},
			AssignedBy: nil, // TODO: Get from context
			IsActive:   true,
			Metadata: model.UserRoleMetadata{
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			},
		}
		if err := s.userRoles.Create(ctx, userRole); err != nil {
			return err
		}
	}
	return nil
}

func (s *userService) RemoveRoles(ctx context.Context, userID string, roleIDs []string) error {
	// For now, we'll implement a simple approach
	// In production, you might want to add a DeleteMany method to BaseRepository
	for _, roleID := range roleIDs {
		// Find the user role first
		userRoles, err := s.userRoles.List(ctx, map[string]interface{}{
			"userId": model.NewUUIDFromString(userID),
			"roleId": model.NewUUIDFromString(roleID),
		}, 1, 0)
		if err != nil {
			return err
		}
		
		// Delete each found user role
		for _, userRole := range userRoles {
			if err := s.userRoles.Delete(ctx, userRole.ID.Hex()); err != nil {
				return err
			}
		}
	}
	return nil
}

func (s *userService) RemoveAllRoles(ctx context.Context, userID string) error {
	// Find all user roles for this user
	userRoles, err := s.userRoles.List(ctx, map[string]interface{}{
		"userId": model.NewUUIDFromString(userID),
	}, 1000, 0) // Large limit to get all roles
	if err != nil {
		return err
	}
	
	// Delete each user role
	for _, userRole := range userRoles {
		if err := s.userRoles.Delete(ctx, userRole.ID.Hex()); err != nil {
			return err
		}
	}
	return nil
}

func (s *userService) GetUserRoles(ctx context.Context, userID string) ([]*model.UserRole, error) {
	userRoles, err := s.userRoles.List(ctx, map[string]interface{}{
		"userId": model.NewUUIDFromString(userID),
	}, 1000, 0) // Large limit to get all roles
	if err != nil {
		return nil, err
	}
	
	// Convert to pointer slice
	result := make([]*model.UserRole, len(userRoles))
	for i, role := range userRoles {
		result[i] = &role
	}
	return result, nil
}
