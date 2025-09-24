package errx

import (
	"errors"
	"fmt"

	"management_system/internal/errcode"
)

type AppError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	HTTP    int    `json:"-"`
	Cause   error  `json:"-"`
}

func (e AppError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("[%d] %s: %v", e.Code, e.Message, e.Cause)
	}
	return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}

func New(code int, msg ...string) AppError {
	def, ok := errcode.Get(code)
	if !ok {
		def = errcode.Definition{HTTP: 500, Message: "Unknown error"}
	}
	m := def.Message
	if len(msg) > 0 && msg[0] != "" {
		m = msg[0]
	}
	return AppError{Code: code, Message: m, HTTP: def.HTTP}
}

func Wrap(code int, cause error) AppError {
	if cause == nil {
		cause = errors.New("unknown")
	}
	e := New(code)
	e.Cause = cause
	return e
}
