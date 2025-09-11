package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"

	"management_system/internal/database"
)

type Server struct {
	port int

	db database.Service
}

func NewServer() *http.Server {
	pstr := os.Getenv("PORT")
	port, err := strconv.Atoi(pstr)
	if err != nil || port == 0 {
		port = 8080
	}
	NewServer := &Server{
		port: port,

		db: database.New(),
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
