package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// AppConfig holds application configuration
 type AppConfig struct {
	Port string
	MongoURI string
	Env string
}

// Load loads configuration from environment and optional .env file
func Load() AppConfig {
	_ = godotenv.Load()
	cfg := AppConfig{
		Port:     getEnv("PORT", "8080"),
		MongoURI: getEnv("MONGO_URI", "mongodb://localhost:27017"),
		Env:      getEnv("APP_ENV", "development"),
	}
	return cfg
}

func getEnv(key, fallback string) string {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	return v
}

func MustGetEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("missing required env var: %s", key)
	}
	return v
}
