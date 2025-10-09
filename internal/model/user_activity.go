package model

import "time"

// UserActivity represents user activity for audit and tracking purposes
type UserActivity struct {
	ID         UUID              `bson:"_id"`
	UserID     UUID              `bson:"userId"`
	Action     string            `bson:"action"` // login, logout, password_change, role_assigned, etc.
	Resource   string            `bson:"resource"` // user, role, permission, etc.
	ResourceID *UUID             `bson:"resourceId,omitempty"`
	Details    map[string]interface{} `bson:"details"`
	Context    ActivityContext   `bson:"context"`
	Outcome    string            `bson:"outcome"` // success, failure, error
	Timestamp  time.Time         `bson:"timestamp"`
}

// ActivityContext contains contextual information about the activity
type ActivityContext struct {
	IPAddress string  `bson:"ipAddress"`
	UserAgent string  `bson:"userAgent"`
	Location  string  `bson:"location"`
	DeviceID  *string `bson:"deviceId,omitempty"`
	SessionID *string `bson:"sessionId,omitempty"`
}
