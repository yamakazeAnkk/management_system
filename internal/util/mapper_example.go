package util

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Example usage of the mapper utility

// CustomMapperConfig creates a custom mapper configuration
func CustomMapperConfig() *MapperConfig {
	return &MapperConfig{
		AutoSetTimestamps:  true,
		AutoSetID:          true,
		IDGenerator:        func() primitive.ObjectID { return primitive.NewObjectID() },
		TimestampGenerator: func() time.Time { return time.Now().UTC() },
	}
}

// CustomMapper creates a mapper with custom configuration
func CustomMapper() *Mapper {
	return NewMapper(CustomMapperConfig())
}

// Example of how to use the mapper in different scenarios:

// 1. Using default mapper (recommended for most cases)
func ExampleDefaultMapper() {
	// The global DefaultMapper is already configured
	// Just use the convenience functions:
	// util.SetDefaults(&myStruct)
	// util.SetUpdateDefaults(&myStruct)
	// util.RemoveID(&myStruct)
}

// 2. Using custom mapper
func ExampleCustomMapper() {
	_ = CustomMapper()

	// Use the mapper instance
	// mapper.SetDefaults(&myStruct)
	// mapper.SetUpdateDefaults(&myStruct)
	// mapper.RemoveID(&myStruct)
}

// 3. Repository integration example
func ExampleRepositoryUsage() {
	// In your repository Create method:
	// if err := util.SetDefaults(&data); err != nil {
	//     return err
	// }

	// In your repository Update method:
	// if err := util.SetUpdateDefaults(&data); err != nil {
	//     return err
	// }
	// updateDoc := util.RemoveID(&data)
	// res, err := r.col.UpdateOne(ctx, bson.M{"_id": oid}, bson.M{"$set": updateDoc})
}
