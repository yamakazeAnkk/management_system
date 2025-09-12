package model

import "time"

type UserLoginHistory struct {
	ID        UUID      `bson:"_id"`
	UserID    UUID      `bson:"userId"`
	LoginAt   time.Time `bson:"loginAt"`
	IPAddress *string   `bson:"ipAddress,omitempty"`
	Outcome   string    `bson:"outcome"` // "Success" / "Fail" / "Locked"
}
