package model

import "time"

// RefreshToken stores refresh token metadata for authentication flows
// Intended to be stored in collection "refresh_tokens"
type RefreshToken struct {
	ID        UUID       `bson:"_id"`
	UserID    UUID       `bson:"userId"`
	TokenHash string     `bson:"tokenHash"` // store hashed value, never plaintext
	ExpiresAt time.Time  `bson:"expiresAt"`
	IsRevoked bool       `bson:"isRevoked"`
	RevokedAt *time.Time `bson:"revokedAt,omitempty"`

	// Context info (optional but useful for security/audit)
	UserAgent *string `bson:"userAgent,omitempty"`
	ClientIP  *string `bson:"clientIp,omitempty"`
	DeviceID  *string `bson:"deviceId,omitempty"`

	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
