package main

// @title           Management System API
// @version         1.0
// @description     API documentation for Management System
// @description     ## Error codes
// @description     - `120001`: Wrong pagination query
// @description     - `120002`: Wrong query
// @description     - `120003`: Wrong body
// @description     - `121101`: Email template not found
// @description     - `121204`: Invalid order
// @description     - `121205`: Email template ID is missing
// @description     - `121206`: Invalid email template ID
// @description     - `121207`: Email template not found
// @description     - `121208`: Stage not found
// @description     - `121301`: Reject reason not found
// @description     - `121401`: Question set not found
// @description     - `121501`: Hiring team not found
// @description     - `121502`: User not found
// @description     - `122101`: Position not found
// @description     - `122201`: Required field
// @description     - `122202`: Stage not found
// @description     - `122203`: Black list or duplicate
// @description     - `122204`: Pool not found
// @description     - `122205`: Candidate not found
// @description     - `122301`: Label not found
// @BasePath        /

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"management_system/api/server"
	_ "management_system/docs"
)

func gracefulShutdown(apiServer *http.Server, done chan bool) {
	// Create context that listens for the interrupt signal from the OS.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Listen for the interrupt signal.
	<-ctx.Done()

	log.Println("shutting down gracefully, press Ctrl+C again to force")
	stop() // Allow Ctrl+C to force shutdown

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := apiServer.Shutdown(ctx); err != nil {
		log.Printf("Server forced to shutdown with error: %v", err)
	}

	log.Println("Server exiting")

	// Notify the main goroutine that the shutdown is complete
	done <- true
}

func main() {

	server := server.NewServer()

	// Create a done channel to signal when the shutdown is complete
	done := make(chan bool, 1)

	// Run graceful shutdown in a separate goroutine
	go gracefulShutdown(server, done)

	err := server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		panic(fmt.Sprintf("http server error: %s", err))
	}

	// Wait for the graceful shutdown to complete
	<-done
	log.Println("Graceful shutdown complete.")
}
