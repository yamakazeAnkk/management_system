package types

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Username string  `json:"username"`
	Password string  `json:"password"`
	FullName string  `json:"fullName"`
	Email    *string `json:"email,omitempty"`
}
