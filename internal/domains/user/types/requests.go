package types

type CreateUserRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type UpdateUserRequest struct {
	Username *string `json:"username,omitempty"`
	Email    *string `json:"email,omitempty"`
	Role     *string `json:"role,omitempty"`
	Status   *string `json:"status,omitempty"`
}

type UserFilter struct {
	Role   *string `json:"role,omitempty"`
	Status *string `json:"status,omitempty"`
	Search *string `json:"search,omitempty"`
}
