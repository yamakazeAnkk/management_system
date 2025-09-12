package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Service interface {
	Health() map[string]string
	GetDatabase() *mongo.Database
	GetClient() *mongo.Client
}

type service struct {
	db       *mongo.Client
	database *mongo.Database
}

var (
	mongoURI = os.Getenv("MONGO_URI")
)

// sanitizeMongoURI removes options that are incompatible with SRV/multi-host URIs.
// In particular, MongoDB Atlas SRV must not use directConnection=true.
func sanitizeMongoURI(uri string) string {
	if uri == "" {
		return uri
	}
	lower := strings.ToLower(uri)
	if !strings.Contains(lower, "directconnection=") && !strings.Contains(lower, "connect=direct") {
		return uri
	}

	cleanup := func(s string, key string) string {
		for _, val := range []string{"true", "false", "direct"} {
			for _, sep := range []string{"?", "&"} {
				needle := fmt.Sprintf("%s%s=%s", sep, key, val)
				s = strings.ReplaceAll(s, needle, "")
			}
		}
		return s
	}

	clean := uri
	clean = cleanup(clean, "directConnection")
	clean = cleanup(clean, "connect")

	// Remove any accidental "?&" or "&&" in the query string
	clean = strings.ReplaceAll(clean, "?&", "?")
	clean = strings.ReplaceAll(clean, "&&", "&")
	// Remove trailing "?" or "&" if present
	if strings.HasSuffix(clean, "&") || strings.HasSuffix(clean, "?") {
		clean = strings.TrimRight(clean, "&?")
	}
	return clean
}

func New() Service {
	uri := mongoURI
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}

	uri = sanitizeMongoURI(uri)

	// Reduce startup blocking: small timeouts
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	clientOpts := options.Client().ApplyURI(uri)
	clientOpts.SetServerSelectionTimeout(2 * time.Second)
	// Atlas recommends Server API v1
	clientOpts.SetServerAPIOptions(options.ServerAPI(options.ServerAPIVersion1))

	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Printf("mongodb connect error: %v", err)
		return &service{db: nil, database: nil}
	}
	// Do not ping at startup to avoid blocking the server

	// Get database name from URI or use default
	dbName := "management_system" // Default database name
	if uri != "" && strings.Contains(uri, "/") {
		parts := strings.Split(uri, "/")
		if len(parts) > 3 && strings.Contains(parts[3], "?") {
			dbName = strings.Split(parts[3], "?")[0]
		} else if len(parts) > 3 {
			dbName = parts[3]
		}
	}

	database := client.Database(dbName)

	return &service{db: client, database: database}
}

func (s *service) Health() map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	status := map[string]string{"message": "It's healthy"}
	if s.db == nil {
		status["db"] = "disconnected"
		status["message"] = "Degraded: DB disconnected"
		return status
	}
	if err := s.db.Ping(ctx, readpref.Primary()); err != nil {
		status["db"] = "unreachable"
		status["error"] = err.Error()
		status["message"] = "Degraded: DB unreachable"
		return status
	}
	status["db"] = "ok"
	return status
}

// GetDatabase returns the database instance
func (s *service) GetDatabase() *mongo.Database {
	return s.database
}

// GetClient returns the MongoDB client
func (s *service) GetClient() *mongo.Client {
	return s.db
}
