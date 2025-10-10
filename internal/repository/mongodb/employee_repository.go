package mongodb

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
)

type employeeRepository struct {
	*MongoBaseRepository[model.Employee]
	col *mongo.Collection
}

func NewEmployeeRepository(col *mongo.Collection) repoif.EmployeeRepository {
	return &employeeRepository{
		MongoBaseRepository: NewMongoBaseRepository[model.Employee](col),
		col:                 col,
	}
}

func (r *employeeRepository) GetByEmployeeID(ctx context.Context, employeeID string) (model.Employee, error) {
	var employee model.Employee
	err := r.col.FindOne(ctx, bson.M{"employeeId": employeeID}).Decode(&employee)
	if err != nil {
		return employee, err
	}
	return employee, nil
}

func (r *employeeRepository) ListWithDetails(ctx context.Context, filter model.EmployeeFilter, limit, offset int) ([]model.Employee, error) {
	// Build MongoDB filter
	mongoFilter := bson.M{}
	
	if filter.Department != nil {
		mongoFilter["employmentInfo.department"] = *filter.Department
	}
	if filter.EmploymentType != nil {
		mongoFilter["employmentInfo.employmentType"] = *filter.EmploymentType
	}
	if filter.Status != nil {
		mongoFilter["status.status"] = *filter.Status
	}
	if filter.WorkLocation != nil {
		mongoFilter["employmentInfo.location"] = *filter.WorkLocation
	}
	if filter.ManagerID != nil {
		mongoFilter["employmentInfo.managerId"] = *filter.ManagerID
	}
	if filter.IsActive != nil {
		mongoFilter["status.isActive"] = *filter.IsActive
	}
	if filter.CreatedAfter != nil {
		mongoFilter["metadata.createdAt"] = bson.M{"$gte": *filter.CreatedAfter}
	}
	if filter.CreatedBefore != nil {
		if mongoFilter["metadata.createdAt"] == nil {
			mongoFilter["metadata.createdAt"] = bson.M{}
		}
		mongoFilter["metadata.createdAt"].(bson.M)["$lte"] = *filter.CreatedBefore
	}

	cursor, err := r.col.Find(ctx, mongoFilter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) CountWithDetails(ctx context.Context, filter model.EmployeeFilter) (int64, error) {
	// Build MongoDB filter (same as ListWithDetails)
	mongoFilter := bson.M{}
	
	if filter.Department != nil {
		mongoFilter["employmentInfo.department"] = *filter.Department
	}
	if filter.EmploymentType != nil {
		mongoFilter["employmentInfo.employmentType"] = *filter.EmploymentType
	}
	if filter.Status != nil {
		mongoFilter["status.status"] = *filter.Status
	}
	if filter.WorkLocation != nil {
		mongoFilter["employmentInfo.location"] = *filter.WorkLocation
	}
	if filter.ManagerID != nil {
		mongoFilter["employmentInfo.managerId"] = *filter.ManagerID
	}
	if filter.IsActive != nil {
		mongoFilter["status.isActive"] = *filter.IsActive
	}
	if filter.CreatedAfter != nil {
		mongoFilter["metadata.createdAt"] = bson.M{"$gte": *filter.CreatedAfter}
	}
	if filter.CreatedBefore != nil {
		if mongoFilter["metadata.createdAt"] == nil {
			mongoFilter["metadata.createdAt"] = bson.M{}
		}
		mongoFilter["metadata.createdAt"].(bson.M)["$lte"] = *filter.CreatedBefore
	}

	count, err := r.col.CountDocuments(ctx, mongoFilter)
	if err != nil {
		return 0, err
	}
	return count, nil
}

func (r *employeeRepository) FindByEmployeeID(ctx context.Context, employeeID string) (*model.Employee, error) {
	var employee model.Employee
	err := r.col.FindOne(ctx, bson.M{"employeeId": employeeID}).Decode(&employee)
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

func (r *employeeRepository) FindByUserID(ctx context.Context, userID string) (*model.Employee, error) {
	var employee model.Employee
	err := r.col.FindOne(ctx, bson.M{"userId": userID}).Decode(&employee)
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

func (r *employeeRepository) FindByEmail(ctx context.Context, email string) (*model.Employee, error) {
	var employee model.Employee
	err := r.col.FindOne(ctx, bson.M{"personalInfo.email": email}).Decode(&employee)
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

func (r *employeeRepository) FindByDepartment(ctx context.Context, department string) ([]model.Employee, error) {
	filter := bson.M{"employmentInfo.department": department}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) FindByManager(ctx context.Context, managerID string) ([]model.Employee, error) {
	filter := bson.M{"employmentInfo.managerId": managerID}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) FindActiveEmployees(ctx context.Context) ([]model.Employee, error) {
	filter := bson.M{"status.isActive": true}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) FindByEmploymentType(ctx context.Context, employmentType string) ([]model.Employee, error) {
	filter := bson.M{"employmentInfo.employmentType": employmentType}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) FindByWorkLocation(ctx context.Context, workLocation string) ([]model.Employee, error) {
	filter := bson.M{"employmentInfo.location": workLocation}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) FindWithFilter(ctx context.Context, filter model.EmployeeFilter, limit int, offset int) ([]model.Employee, error) {
	return r.ListWithDetails(ctx, filter, limit, offset)
}

func (r *employeeRepository) CountWithFilter(ctx context.Context, filter model.EmployeeFilter) (int64, error) {
	return r.CountWithDetails(ctx, filter)
}

func (r *employeeRepository) FindBySkills(ctx context.Context, skills []string) ([]model.Employee, error) {
	filter := bson.M{"professionalInfo.skills": bson.M{"$in": skills}}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) FindBySalaryRange(ctx context.Context, minSalary, maxSalary float64) ([]model.Employee, error) {
	filter := bson.M{"compensation.baseSalary": bson.M{"$gte": minSalary, "$lte": maxSalary}}
	cursor, err := r.col.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var employees []model.Employee
	for cursor.Next(ctx) {
		var employee model.Employee
		if err := cursor.Decode(&employee); err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	return employees, nil
}

func (r *employeeRepository) GetDepartmentStats(ctx context.Context) (map[string]int64, error) {
	pipeline := []bson.M{
		{
			"$group": bson.M{
				"_id":   "$employmentInfo.department",
				"count": bson.M{"$sum": 1},
			},
		},
	}
	
	cursor, err := r.col.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	stats := make(map[string]int64)
	for cursor.Next(ctx) {
		var result struct {
			ID    string `bson:"_id"`
			Count int64  `bson:"count"`
		}
		if err := cursor.Decode(&result); err != nil {
			return nil, err
		}
		stats[result.ID] = result.Count
	}
	return stats, nil
}

func (r *employeeRepository) GetEmploymentTypeStats(ctx context.Context) (map[string]int64, error) {
	pipeline := []bson.M{
		{
			"$group": bson.M{
				"_id":   "$employmentInfo.employmentType",
				"count": bson.M{"$sum": 1},
			},
		},
	}
	
	cursor, err := r.col.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	stats := make(map[string]int64)
	for cursor.Next(ctx) {
		var result struct {
			ID    string `bson:"_id"`
			Count int64  `bson:"count"`
		}
		if err := cursor.Decode(&result); err != nil {
			return nil, err
		}
		stats[result.ID] = result.Count
	}
	return stats, nil
}

func (r *employeeRepository) GetStatusStats(ctx context.Context) (map[string]int64, error) {
	pipeline := []bson.M{
		{
			"$group": bson.M{
				"_id":   "$status.status",
				"count": bson.M{"$sum": 1},
			},
		},
	}
	
	cursor, err := r.col.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	stats := make(map[string]int64)
	for cursor.Next(ctx) {
		var result struct {
			ID    string `bson:"_id"`
			Count int64  `bson:"count"`
		}
		if err := cursor.Decode(&result); err != nil {
			return nil, err
		}
		stats[result.ID] = result.Count
	}
	return stats, nil
}

func (r *employeeRepository) BulkUpdateStatus(ctx context.Context, employeeIDs []string, status string) error {
	// Convert string IDs to ObjectIDs
	objectIDs := make([]interface{}, len(employeeIDs))
	for i, id := range employeeIDs {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return err
		}
		objectIDs[i] = objectID
	}

	// Update all employees with new status
	filter := bson.M{"_id": bson.M{"$in": objectIDs}}
	update := bson.M{
		"$set": bson.M{
			"status.status":      status,
			"metadata.updatedAt": time.Now(),
		},
	}

	_, err := r.col.UpdateMany(ctx, filter, update)
	return err
}

func (r *employeeRepository) BulkUpdateDepartment(ctx context.Context, employeeIDs []string, department string) error {
	// Convert string IDs to ObjectIDs
	objectIDs := make([]interface{}, len(employeeIDs))
	for i, id := range employeeIDs {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return err
		}
		objectIDs[i] = objectID
	}

	// Update all employees with new department
	filter := bson.M{"_id": bson.M{"$in": objectIDs}}
	update := bson.M{
		"$set": bson.M{
			"employmentInfo.department": department,
			"metadata.updatedAt":        time.Now(),
		},
	}

	_, err := r.col.UpdateMany(ctx, filter, update)
	return err
}

func (r *employeeRepository) BulkUpdateManager(ctx context.Context, employeeIDs []string, managerID string) error {
	// Convert string IDs to ObjectIDs
	objectIDs := make([]interface{}, len(employeeIDs))
	for i, id := range employeeIDs {
		objectID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return err
		}
		objectIDs[i] = objectID
	}

	// Update all employees with new manager
	filter := bson.M{"_id": bson.M{"$in": objectIDs}}
	update := bson.M{
		"$set": bson.M{
			"employmentInfo.managerId": managerID,
			"metadata.updatedAt":       time.Now(),
		},
	}

	_, err := r.col.UpdateMany(ctx, filter, update)
	return err
}
