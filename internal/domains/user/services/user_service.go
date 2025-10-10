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
	users repoif.UserRepository
}

func NewUserService(
	users repoif.UserRepository,
) interfaces.UserService {
	return &userService{
		users: users,
	}
}

func (s *userService) CreateUser(ctx context.Context, req types.CreateUserRequest) (*model.User, error) {
	// Check if username already exists
	existingUser, err := s.users.GetByUsername(ctx, req.Username)
	if err == nil && existingUser != nil {
		return nil, errors.New("username already exists")
	}

	// Hash password
	hashedPassword, err := autil.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	// Create user (authentication only)
	user := model.User{
		ID:           model.NewUUID(),
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: hashedPassword,
		Role:         req.Role,
		Status:       "active",
		LastLoginAt:  nil,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	if err := s.users.Create(ctx, user); err != nil {
		return nil, err
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
	return s.users.GetByUsername(ctx, username)
}

func (s *userService) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	return s.users.GetByEmail(ctx, email)
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
	if req.Email != nil {
		user.Email = *req.Email
	}
	if req.Role != nil {
		user.Role = *req.Role
	}
	if req.Status != nil {
		user.Status = *req.Status
	}

	user.UpdatedAt = time.Now()

	if err := s.users.Update(ctx, id, *user); err != nil {
		return nil, err
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
		case "email":
			mongoUpdates["email"] = value
		case "role":
			mongoUpdates["role"] = value
		case "status":
			mongoUpdates["status"] = value
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
	
	if filter.Role != nil {
		query["role"] = *filter.Role
	}
	if filter.Status != nil {
		query["status"] = *filter.Status
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


// Note: Role management methods removed as User model is now for authentication only
