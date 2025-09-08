package main

import (
	"flag"
	"fmt"
)

func main() {
	name := flag.String("name", "world", "name to greet")
	flag.Parse()
	fmt.Printf("hello, %s\n", *name)
}
