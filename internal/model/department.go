package model

type Department struct {
	ID   UUID  `bson:"_id"`
	Name string `bson:"name"`
}
