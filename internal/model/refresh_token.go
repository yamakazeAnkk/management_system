package model

import "time"

// RefreshToken stores refresh token metadata for authentication flows with enhanced security tracking
type RefreshToken struct {
	ID         UUID                `bson:"_id"`
	UserID     UUID                `bson:"userId"`
	TokenHash  string              `bson:"tokenHash"` // store hashed value, never plaintext
	DeviceInfo DeviceInfo          `bson:"deviceInfo"`
	Location   TokenLocation       `bson:"location"`
	ExpiresAt  time.Time           `bson:"expiresAt"`
	IsRevoked  bool                `bson:"isRevoked"`
	RevokedAt  *time.Time          `bson:"revokedAt,omitempty"`
	RevokedBy  *UUID               `bson:"revokedBy,omitempty"`
	RevokedReason string           `bson:"revokedReason"`
	Metadata   RefreshTokenMetadata `bson:"metadata"`
}

// DeviceInfo contains device information for the token
type DeviceInfo struct {
	DeviceID    string `bson:"deviceId"`
	DeviceName  string `bson:"deviceName"`
	Platform    string `bson:"platform"` // web, mobile, desktop
	UserAgent   string `bson:"userAgent"`
	BrowserInfo string `bson:"browserInfo,omitempty"`
	OSInfo      string `bson:"osInfo,omitempty"`
}

// TokenLocation contains location information for the token
type TokenLocation struct {
	IPAddress string `bson:"ipAddress"`
	Country   string `bson:"country"`
	City      string `bson:"city"`
	Region    string `bson:"region,omitempty"`
}

// RefreshTokenMetadata contains metadata about refresh token record
type RefreshTokenMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
