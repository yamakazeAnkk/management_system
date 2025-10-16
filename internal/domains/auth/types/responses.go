package types

type TokenPair struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}
type RegisterResponse struct {
	Message string `json:"message"`
}
