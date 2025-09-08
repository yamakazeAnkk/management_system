package main

import (
	"fmt"
	"log"

	"management_system/api/server"
	"management_system/config"
)

func main() {
	cfg := config.Load()
	r := server.NewServer()
	addr := ":" + cfg.Port
	fmt.Printf("Starting server on %s (env=%s)\n", addr, cfg.Env)
	if err := r.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
