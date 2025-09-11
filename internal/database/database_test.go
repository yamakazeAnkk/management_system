package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/mongodb"
)

func mustStartMongoContainer() (func(context.Context, ...testcontainers.TerminateOption) error, error) {
	dbContainer, err := mongodb.Run(context.Background(), "mongo:latest")
	if err != nil {
		return nil, err
	}

	dbHost, err := dbContainer.Host(context.Background())
	if err != nil {
		return dbContainer.Terminate, err
	}

	dbPort, err := dbContainer.MappedPort(context.Background(), "27017/tcp")
	if err != nil {
		return dbContainer.Terminate, err
	}

	mongoURI = fmt.Sprintf("mongodb://%s:%s", dbHost, dbPort.Port())

	return dbContainer.Terminate, err
}

func TestMain(m *testing.M) {
	// If MONGO_URI is set, use it and do not start Docker
	if uri := os.Getenv("MONGO_URI"); uri != "" {
		code := m.Run()
		os.Exit(code)
	}

	teardown, err := mustStartMongoContainer()
	if err != nil {
		log.Printf("could not start mongodb container, skipping tests: %v", err)
		os.Exit(0)
	}

	code := m.Run()

	if teardown != nil && teardown(context.Background()) != nil {
		log.Printf("could not teardown mongodb container: %v", err)
	}
	os.Exit(code)
}

func TestNew(t *testing.T) {
	srv := New()
	if srv == nil {
		t.Fatal("New() returned nil")
	}
}

func TestHealth(t *testing.T) {
	srv := New()

	stats := srv.Health()

	if stats["message"] != "It's healthy" {
		t.Fatalf("expected message to be 'It's healthy', got %s", stats["message"])
	}
}
