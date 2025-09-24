package util

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type PaginationParams struct {
	Page    int
	PerPage int
	Limit   int
	Offset  int
}

// ParsePagination reads page/per_page (preferred) or limit/offset (fallback)
// and returns normalized pagination parameters.
func ParsePagination(c *gin.Context) PaginationParams {
	// Defaults
	page := 1
	perPage := 20

	// Flags to know what the client actually provided
	providedPage := false
	// retained for future extension (not used currently)
	// providedPerPage := false
	// providedLimit := false
	providedOffset := false

	if v := c.Query("page"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			page = n
			providedPage = true
		}
	}
	if v := c.Query("per_page"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			perPage = n
			// providedPerPage = true
		}
	}
	if v := c.Query("limit"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			perPage = n
			// providedLimit = true
		}
	}
	var offsetVal int
	if v := c.Query("offset"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n >= 0 {
			offsetVal = n
			providedOffset = true
		}
	}

	// Priority:
	// 1) If page is provided, IGNORE offset
	// 2) limit overrides per_page
	// 3) If page not provided but offset is, derive page from offset
	if !providedPage && providedOffset && perPage > 0 {
		page = (offsetVal / perPage) + 1
	}

	if perPage <= 0 {
		perPage = 20
	}
	if page <= 0 {
		page = 1
	}

	return PaginationParams{
		Page:    page,
		PerPage: perPage,
		Limit:   perPage,
		Offset:  (page - 1) * perPage,
	}
}

// BuildMeta constructs standard pagination metadata.
func BuildMeta(total int64, page int, perPage int, count int) map[string]any {
	totalPages := 0
	if perPage > 0 && total > 0 {
		totalPages = int((total + int64(perPage) - 1) / int64(perPage))
	}
	return map[string]any{
		"count":        count,
		"current_page": page,
		"per_page":     perPage,
		"total":        total,
		"total_pages":  totalPages,
	}
}
