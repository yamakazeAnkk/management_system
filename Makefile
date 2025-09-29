# Simple Makefile for a Go project

# Build the application
all: build test

build:
	@echo "Building..."
	
	
	@go build -o main cmd/api/main.go

# Run the application
run:
	@go run cmd/api/main.go &
	@npm install --prefer-offline --no-fund --prefix ./frontend
	@npm run dev --prefix ./frontend

swag-install:
	@echo "Installing swag CLI..."
	@go install github.com/swaggo/swag/cmd/swag@latest

swag-init:
	@`go env GOPATH`/bin/swag init -g cmd/api/main.go -d . -o ./docs
	

# Run backend only
run-backend:		
	@go run cmd/api/main.go

# Run frontend only
run-frontend:
	@echo "Starting frontend development server..."
	@cd frontend && npm install --prefer-offline --no-fund
	@cd frontend && npm run dev

# Stop backend only
stop-backend:
	lsof -ti :8080 | xargs kill -9

# Stop frontend only
stop-frontend:
	lsof -ti :5173 | xargs kill -9

# Create DB container
docker-run:
	@if docker compose up --build 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose up --build; \
	fi

# Shutdown DB container
docker-down:
	@if docker compose down 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose down; \
	fi

# Test the application
test:
	@echo "Testing..."
	@go test ./... -v
# Integrations Tests for the application
itest:
	@echo "Running integration tests..."
	@go test ./internal/database -v

# Clean the binary
clean:
	@echo "Cleaning..."
	@rm -f main

# Live Reload
watch:
	@if command -v air > /dev/null; then \
            air; \
            echo "Watching...";\
        else \
            read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
            if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
                go install github.com/air-verse/air@latest; \
                air; \
                echo "Watching...";\
            else \
                echo "You chose not to install air. Exiting..."; \
                exit 1; \
            fi; \
        fi

# Debug commands
debug-api:
	@echo "Starting debug for API server..."
	@dlv debug ./cmd/api/main.go --headless --listen=:2345 --api-version=2 --accept-multiclient

debug-app:
	@echo "Starting debug for App server..."
	@dlv debug ./cmd/app/main.go --headless --listen=:2346 --api-version=2 --accept-multiclient

debug-cli:
	@echo "Starting debug for CLI..."
	@dlv debug ./cmd/cli/main.go --headless --listen=:2347 --api-version=2 --accept-multiclient

# Debug with breakpoints
debug-api-interactive:
	@echo "Starting interactive debug for API server..."
	@dlv debug ./cmd/api/main.go

debug-app-interactive:
	@echo "Starting interactive debug for App server..."
	@dlv debug ./cmd/app/main.go

debug-cli-interactive:
	@echo "Starting interactive debug for CLI..."
	@dlv debug ./cmd/cli/main.go

# Install delve debugger
install-delve:
	@echo "Installing Delve debugger..."
	@go install github.com/go-delve/delve/cmd/dlv@latest
	@echo "Delve installed successfully!"

# Check if delve is installed
check-delve:
	@if command -v dlv > /dev/null; then \
		echo "Delve is installed: $$(dlv version)"; \
	else \
		echo "Delve is not installed. Run 'make install-delve' to install it."; \
	fi

.PHONY: all build run run-backend run-frontend stop-backend stop-frontend test clean watch docker-run docker-down itest debug-api debug-app debug-cli debug-api-interactive debug-app-interactive debug-cli-interactive install-delve check-delve
