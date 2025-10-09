package service

import (
	"context"
	"errors"
	"time"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
	sif "management_system/internal/service/interfaces"
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
) sif.UserService {
	return &userService{
		users:     users,
		userRoles: userRoles,
		roles:     roles,
	}
}

func (s *userService) CreateUser(ctx context.Context, req sif.CreateUserRequest) (*model.User, error) {
	// Validate required fields
	if req.Username == "" || req.Password == "" || req.EmployeeID == "" {
		return nil, errors.New("username, password, and employeeID are required")
	}

	// Hash password
	hash, err := autil.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	// Create user
	user := &model.User{
		ID:           model.NewUUID(),
		EmployeeID:   req.EmployeeID,
		Username:     req.Username,
		PasswordHash: hash,
		PersonalInfo: req.PersonalInfo,
		EmploymentInfo: req.EmploymentInfo,
		ProfessionalInfo: req.ProfessionalInfo,
		EmergencyContact: req.EmergencyContact,
		Documents: func() model.UserDocuments {
			if req.Documents != nil {
				return *req.Documents
			}
			return model.UserDocuments{
				Contracts:    []model.DocumentInfo{},
				Certificates: []model.DocumentInfo{},
				Other:        []model.DocumentInfo{},
			}
		}(),
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

	// Save user
	if err := s.users.Create(ctx, *user); err != nil {
		return nil, err
	}

	// Assign roles if provided
	if len(req.RoleIDs) > 0 {
		if err := s.AssignRoles(ctx, user.ID.Hex(), req.RoleIDs); err != nil {
			// Log error but don't fail user creation
			// In production, you might want to use a transaction here
		}
	}

	return user, nil
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

func (s *userService) UpdateUser(ctx context.Context, id string, req sif.UpdateUserRequest) (*model.User, error) {
	user, err := s.users.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

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

	if err := s.users.Update(ctx, id, user); err != nil {
		return nil, err
	}

	// Update roles if provided
	if len(req.RoleIDs) > 0 {
		// Remove all existing roles
		if err := s.RemoveAllRoles(ctx, id); err != nil {
			return nil, err
		}
		// Assign new roles
		if err := s.AssignRoles(ctx, id, req.RoleIDs); err != nil {
			return nil, err
		}
	}

	return &user, nil
}

func (s *userService) DeleteUser(ctx context.Context, id string) error {
	// Remove all user roles first
	if err := s.RemoveAllRoles(ctx, id); err != nil {
		return err
	}
	
	return s.users.Delete(ctx, id)
}

func (s *userService) ListUsers(ctx context.Context, filter sif.UserFilter, limit, offset int) ([]*model.User, int64, error) {
	// Convert filter to map for repository
	filterMap := make(map[string]interface{})
	if filter.DepartmentID != nil {
		filterMap["employmentInfo.departmentId"] = *filter.DepartmentID
	}
	if filter.IsActive != nil {
		filterMap["status.isActive"] = *filter.IsActive
	}
	if filter.EmployeeID != nil {
		filterMap["employeeId"] = *filter.EmployeeID
	}

	users, err := s.users.List(ctx, filterMap, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	total, err := s.users.Count(ctx, filterMap)
	if err != nil {
		return nil, 0, err
	}

	// Convert []model.User to []*model.User
	userPtrs := make([]*model.User, len(users))
	for i := range users {
		userPtrs[i] = &users[i]
	}

	return userPtrs, total, nil
}

func (s *userService) AssignRoles(ctx context.Context, userID string, roleIDs []string) error {
	userObjID, err := model.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	for _, roleID := range roleIDs {
		roleObjID, err := model.ObjectIDFromHex(roleID)
		if err != nil {
			continue // Skip invalid role IDs
		}

		// Check if role exists
		_, err = s.roles.GetByID(ctx, roleID)
		if err != nil {
			continue // Skip non-existent roles
		}

		// Create user role assignment
		userRole := model.UserRole{
			ID:     model.NewUUID(),
			UserID: userObjID,
			RoleID: roleObjID,
			AssignmentType: "primary",
			Scope: model.UserRoleScope{
				LocationCode: "",
				ProjectIds:   []model.UUID{},
			},
			EffectiveDates: model.UserRoleDates{
				AssignedAt:    time.Now(),
				EffectiveFrom: time.Now(),
			},
			IsActive: true,
			Metadata: model.UserRoleMetadata{
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			},
		}

		if err := s.userRoles.Create(ctx, userRole); err != nil {
			// Log error but continue with other roles
			continue
		}
	}

	return nil
}

func (s *userService) RemoveRoles(ctx context.Context, userID string, roleIDs []string) error {
	userObjID, err := model.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	for _, roleID := range roleIDs {
		roleObjID, err := model.ObjectIDFromHex(roleID)
		if err != nil {
			continue
		}

		// Find and deactivate user role assignment
		filter := map[string]interface{}{
			"userId": userObjID,
			"roleId": roleObjID,
			"isActive": true,
		}

		userRoles, err := s.userRoles.List(ctx, filter, 1, 0)
		if err != nil || len(userRoles) == 0 {
			continue
		}

		userRole := userRoles[0]
		userRole.IsActive = false
		userRole.Metadata.UpdatedAt = time.Now()

		if err := s.userRoles.Update(ctx, userRole.ID.Hex(), userRole); err != nil {
			continue
		}
	}

	return nil
}

func (s *userService) RemoveAllRoles(ctx context.Context, userID string) error {
	userObjID, err := model.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	filter := map[string]interface{}{
		"userId": userObjID,
		"isActive": true,
	}

	userRoles, err := s.userRoles.List(ctx, filter, 1000, 0)
	if err != nil {
		return err
	}

	for _, userRole := range userRoles {
		userRole.IsActive = false
		userRole.Metadata.UpdatedAt = time.Now()
		
		if err := s.userRoles.Update(ctx, userRole.ID.Hex(), userRole); err != nil {
			continue
		}
	}

	return nil
}

func (s *userService) GetUserRoles(ctx context.Context, userID string) ([]*model.UserRole, error) {
	userObjID, err := model.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	filter := map[string]interface{}{
		"userId": userObjID,
		"isActive": true,
	}

	userRoles, err := s.userRoles.List(ctx, filter, 1000, 0)
	if err != nil {
		return nil, err
	}

	// Convert []model.UserRole to []*model.UserRole
	userRolePtrs := make([]*model.UserRole, len(userRoles))
	for i := range userRoles {
		userRolePtrs[i] = &userRoles[i]
	}

	return userRolePtrs, nil
}
