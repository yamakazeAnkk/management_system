package types

type CreateRoleRequest struct {
	Name        string `json:"name"`
	Code        string `json:"code"`
	Description string `json:"description,omitempty"`
	IsActive    bool   `json:"isActive"`
}
