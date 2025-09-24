package errcode

import "net/http"

type Definition struct {
	HTTP    int
	Message string
}

var registry = map[int]Definition{
	120001: {HTTP: http.StatusBadRequest, Message: "Wrong pagination query"},
	120002: {HTTP: http.StatusBadRequest, Message: "Wrong query"},
	120003: {HTTP: http.StatusBadRequest, Message: "Wrong body"},
	121101: {HTTP: http.StatusNotFound, Message: "Email template not found"},
	121204: {HTTP: http.StatusBadRequest, Message: "Invalid order"},
	121205: {HTTP: http.StatusBadRequest, Message: "Email template ID is missing"},
	121206: {HTTP: http.StatusBadRequest, Message: "Invalid email template ID"},
	121207: {HTTP: http.StatusNotFound, Message: "Email template not found"},
	121208: {HTTP: http.StatusNotFound, Message: "Stage not found"},
	121301: {HTTP: http.StatusNotFound, Message: "Reject reason not found"},
	121401: {HTTP: http.StatusNotFound, Message: "Question set not found"},
	121501: {HTTP: http.StatusNotFound, Message: "Hiring team not found"},
	121502: {HTTP: http.StatusNotFound, Message: "User not found"},
	122101: {HTTP: http.StatusNotFound, Message: "Position not found"},
	122201: {HTTP: http.StatusBadRequest, Message: "Required field"},
	122202: {HTTP: http.StatusNotFound, Message: "Stage not found"},
	122203: {HTTP: http.StatusBadRequest, Message: "Black list or duplicate"},
	122204: {HTTP: http.StatusNotFound, Message: "Pool not found"},
	122205: {HTTP: http.StatusNotFound, Message: "Candidate not found"},
	122301: {HTTP: http.StatusNotFound, Message: "Label not found"},

	500000: {HTTP: http.StatusInternalServerError, Message: "Internal server error"},
}

func Get(code int) (Definition, bool) { def, ok := registry[code]; return def, ok }

// List returns all registered error codes
func List() map[int]Definition { return registry }
