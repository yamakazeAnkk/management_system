package util

import (
	"crypto/rand"
	"encoding/hex"
)

// GenerateID generates a unique ID
func GenerateID() string {
	bytes := make([]byte, 8)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)
}
