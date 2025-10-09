#!/bin/bash

# Build script for the management system API

echo "Building management system API..."

# Build the binary
go build -mod=mod -o api_binary ./cmd/api

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Binary created: api_binary"
    echo "📊 Binary size: $(du -h api_binary | cut -f1)"
    echo ""
    echo "🚀 To run the server:"
    echo "   ./api_binary"
    echo ""
    echo "🧪 To test the server:"
    echo "   curl http://localhost:8080/health"
else
    echo "❌ Build failed!"
    exit 1
fi
