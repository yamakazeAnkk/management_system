package model

type Permission struct {
	ID       UUID  `bson:"_id"`
	Key      string `bson:"key"`    // unique, e.g. "employee.read"
	Name     string `bson:"name"`   // display text
	Module   string `bson:"module"` // e.g. "employee"
	IsActive bool   `bson:"isActive"`
}
