package services

import (
	"context"
	"management_system/internal/domains/user/types"
	"management_system/internal/model"
	old_interfaces "management_system/internal/service/interfaces"
)

// UserServiceAdapter adapts old UserService interface to new domain types
type UserServiceAdapter struct {
	oldService old_interfaces.UserService
}

func NewUserServiceAdapter(oldService old_interfaces.UserService) *UserServiceAdapter {
	return &UserServiceAdapter{oldService: oldService}
}

func (a *UserServiceAdapter) GetUser(ctx context.Context, id string) (*model.User, error) {
	return a.oldService.GetUser(ctx, id)
}

func (a *UserServiceAdapter) UpdateUser(ctx context.Context, id string, req types.UpdateUserRequest) (*model.User, error) {
	// Convert new UpdateUserRequest to old UpdateUserRequest
	oldReq := old_interfaces.UpdateUserRequest{
		Username:         req.Username,
		PersonalInfo:     req.PersonalInfo,
		EmploymentInfo:   req.EmploymentInfo,
		ProfessionalInfo: req.ProfessionalInfo,
		EmergencyContact: req.EmergencyContact,
		Documents:        req.Documents,
		Status:           req.Status,
		RoleIDs:          req.RoleIDs,
	}
	return a.oldService.UpdateUser(ctx, id, oldReq)
}
