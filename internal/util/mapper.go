package util

import (
	"reflect"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// MapperConfig holds configuration for mapping operations
type MapperConfig struct {
	// AutoSetTimestamps automatically sets CreatedAt and UpdatedAt
	AutoSetTimestamps bool
	// AutoSetID automatically sets ID if empty
	AutoSetID bool
	// IDGenerator function to generate new IDs
	IDGenerator func() primitive.ObjectID
	// TimestampGenerator function to get current time
	TimestampGenerator func() time.Time
}

// DefaultMapperConfig returns a default mapper configuration
func DefaultMapperConfig() *MapperConfig {
	return &MapperConfig{
		AutoSetTimestamps:  true,
		AutoSetID:          true,
		IDGenerator:        primitive.NewObjectID,
		TimestampGenerator: time.Now,
	}
}

// Mapper provides mapping utilities for structs
type Mapper struct {
	config *MapperConfig
}

// NewMapper creates a new mapper with the given configuration
func NewMapper(config *MapperConfig) *Mapper {
	if config == nil {
		config = DefaultMapperConfig()
	}
	return &Mapper{config: config}
}

// SetDefaults sets default values for a struct based on the mapper configuration
func (m *Mapper) SetDefaults(data interface{}) error {
	if data == nil {
		return nil
	}

	val := reflect.ValueOf(data)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	if val.Kind() != reflect.Struct {
		return nil
	}

	now := m.config.TimestampGenerator()

	// Set ID if needed
	if m.config.AutoSetID {
		if idField := val.FieldByName("ID"); idField.IsValid() {
			if idField.Type() == reflect.TypeOf(primitive.ObjectID{}) {
				if id, ok := idField.Interface().(primitive.ObjectID); ok && id.IsZero() {
					idField.Set(reflect.ValueOf(m.config.IDGenerator()))
				}
			}
		}
	}

	// Set timestamps if needed
	if m.config.AutoSetTimestamps {
		// Set CreatedAt
		if createdAtField := val.FieldByName("CreatedAt"); createdAtField.IsValid() {
			if createdAtField.Type() == reflect.TypeOf(time.Time{}) {
				if createdAt, ok := createdAtField.Interface().(time.Time); ok && createdAt.IsZero() {
					createdAtField.Set(reflect.ValueOf(now))
				}
			}
		}

		// Set UpdatedAt
		if updatedAtField := val.FieldByName("UpdatedAt"); updatedAtField.IsValid() {
			if updatedAtField.Type() == reflect.TypeOf(time.Time{}) {
				updatedAtField.Set(reflect.ValueOf(now))
			}
		}
	}

	return nil
}

// SetUpdateDefaults sets default values for update operations
func (m *Mapper) SetUpdateDefaults(data interface{}) error {
	if data == nil {
		return nil
	}

	val := reflect.ValueOf(data)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	if val.Kind() != reflect.Struct {
		return nil
	}

	now := m.config.TimestampGenerator()

	// Set UpdatedAt for updates
	if m.config.AutoSetTimestamps {
		if updatedAtField := val.FieldByName("UpdatedAt"); updatedAtField.IsValid() {
			if updatedAtField.Type() == reflect.TypeOf(time.Time{}) {
				updatedAtField.Set(reflect.ValueOf(now))
			}
		}
	}

	return nil
}

// RemoveID removes the ID field from a struct to prevent updating it
func (m *Mapper) RemoveID(data interface{}) map[string]interface{} {
	if data == nil {
		return make(map[string]interface{})
	}

	val := reflect.ValueOf(data)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	if val.Kind() != reflect.Struct {
		return make(map[string]interface{})
	}

	result := make(map[string]interface{})
	typ := val.Type()

	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		fieldType := typ.Field(i)

		// Skip ID field
		if fieldType.Name == "ID" {
			continue
		}

		// Get BSON tag for field name
		bsonTag := fieldType.Tag.Get("bson")
		if bsonTag == "" || bsonTag == "-" {
			continue
		}

		// Extract field name from BSON tag
		fieldName := bsonTag
		if idx := len(fieldName); idx > 0 {
			// Remove options like omitempty
			if commaIdx := 0; commaIdx < len(fieldName) {
				for j, char := range fieldName {
					if char == ',' {
						fieldName = fieldName[:j]
						break
					}
				}
			}
		}

		if fieldName != "" {
			result[fieldName] = field.Interface()
		}
	}

	return result
}

// Global mapper instance with default configuration
var DefaultMapper = NewMapper(DefaultMapperConfig())

// SetDefaults is a convenience function using the global mapper
func SetDefaults(data interface{}) error {
	return DefaultMapper.SetDefaults(data)
}

// SetUpdateDefaults is a convenience function using the global mapper
func SetUpdateDefaults(data interface{}) error {
	return DefaultMapper.SetUpdateDefaults(data)
}

// RemoveID is a convenience function using the global mapper
func RemoveID(data interface{}) map[string]interface{} {
	return DefaultMapper.RemoveID(data)
}
