package services

import (
	"context"
	"time"

	"management_system/internal/model"
	repoif "management_system/internal/repository/interface"
)

type EmployeeService interface {
	CreateEmployee(ctx context.Context, req model.EmployeeCreateRequest) (*model.Employee, error)
	GetEmployee(ctx context.Context, id string) (*model.Employee, error)
	GetEmployeeByEmployeeID(ctx context.Context, employeeID string) (*model.Employee, error)
	UpdateEmployee(ctx context.Context, id string, req model.EmployeeUpdateRequest) (*model.Employee, error)
	PartialUpdateEmployee(ctx context.Context, id string, updates map[string]interface{}) (*model.Employee, error)
	DeleteEmployee(ctx context.Context, id string) error
	ListEmployees(ctx context.Context, filter model.EmployeeFilter, limit, offset int) ([]*model.Employee, int64, error)
}

type employeeService struct {
	employees repoif.EmployeeRepository
}

func NewEmployeeService(employees repoif.EmployeeRepository) EmployeeService {
	return &employeeService{
		employees: employees,
	}
}

func (s *employeeService) CreateEmployee(ctx context.Context, req model.EmployeeCreateRequest) (*model.Employee, error) {
	// Generate Employee ID
	employeeID := "EMP" + model.NewUUID().Hex()[:6]
	
	employee := model.Employee{
		ID:              model.NewUUID(),
		EmployeeID:      employeeID,
		PersonalInfo:    req.PersonalInfo,
		EmploymentInfo:  req.EmploymentInfo,
		Compensation:    req.Compensation,
		EmergencyContact: req.EmergencyContact,
		ProfessionalInfo: req.ProfessionalInfo,
		Documents:       req.Documents,
		Status: model.EmployeeStatus{
			IsActive: true,
			Status:   model.EmployeeStatusActive,
		},
		Metadata: model.EmployeeMetadata{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	if err := s.employees.Create(ctx, employee); err != nil {
		return nil, err
	}

	return &employee, nil
}

func (s *employeeService) GetEmployee(ctx context.Context, id string) (*model.Employee, error) {
	employee, err := s.employees.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

func (s *employeeService) GetEmployeeByEmployeeID(ctx context.Context, employeeID string) (*model.Employee, error) {
	employee, err := s.employees.GetByID(ctx, employeeID)
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

func (s *employeeService) UpdateEmployee(ctx context.Context, id string, req model.EmployeeUpdateRequest) (*model.Employee, error) {
	// Get existing employee
	existing, err := s.employees.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Update fields if provided
	if req.PersonalInfo != nil {
		existing.PersonalInfo = *req.PersonalInfo
	}
	if req.EmploymentInfo != nil {
		existing.EmploymentInfo = *req.EmploymentInfo
	}
	if req.Compensation != nil {
		existing.Compensation = *req.Compensation
	}
	if req.EmergencyContact != nil {
		existing.EmergencyContact = *req.EmergencyContact
	}
	if req.ProfessionalInfo != nil {
		existing.ProfessionalInfo = *req.ProfessionalInfo
	}
	if req.Documents != nil {
		existing.Documents = *req.Documents
	}
	if req.Status != nil {
		existing.Status = *req.Status
	}

	existing.Metadata.UpdatedAt = time.Now()

	if err := s.employees.Update(ctx, id, existing); err != nil {
		return nil, err
	}

	return &existing, nil
}

func (s *employeeService) PartialUpdateEmployee(ctx context.Context, id string, updates map[string]interface{}) (*model.Employee, error) {
	// Build MongoDB update document
	mongoUpdates := make(map[string]interface{})

	// Map frontend fields to MongoDB fields
	for key, value := range updates {
		switch key {
		case "personalInfo":
			if personalInfo, ok := value.(map[string]interface{}); ok {
				for pKey, pValue := range personalInfo {
					mongoUpdates["personalInfo."+pKey] = pValue
				}
			}
		case "employmentInfo":
			if employmentInfo, ok := value.(map[string]interface{}); ok {
				for eKey, eValue := range employmentInfo {
					mongoUpdates["employmentInfo."+eKey] = eValue
				}
			}
		case "compensation":
			if compensation, ok := value.(map[string]interface{}); ok {
				for cKey, cValue := range compensation {
					mongoUpdates["compensation."+cKey] = cValue
				}
			}
		case "emergencyContact":
			if emergencyContact, ok := value.(map[string]interface{}); ok {
				for ecKey, ecValue := range emergencyContact {
					mongoUpdates["emergencyContact."+ecKey] = ecValue
				}
			}
		case "professionalInfo":
			if professionalInfo, ok := value.(map[string]interface{}); ok {
				for prKey, prValue := range professionalInfo {
					mongoUpdates["professionalInfo."+prKey] = prValue
				}
			}
		case "status":
			if status, ok := value.(map[string]interface{}); ok {
				for sKey, sValue := range status {
					mongoUpdates["status."+sKey] = sValue
				}
			}
		default:
			mongoUpdates[key] = value
		}
	}

	// Perform partial update
	if err := s.employees.PartialUpdate(ctx, id, mongoUpdates); err != nil {
		return nil, err
	}

	// Return updated employee
	employee, err := s.employees.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

func (s *employeeService) DeleteEmployee(ctx context.Context, id string) error {
	return s.employees.Delete(ctx, id)
}

func (s *employeeService) ListEmployees(ctx context.Context, filter model.EmployeeFilter, limit, offset int) ([]*model.Employee, int64, error) {
	employees, err := s.employees.FindWithFilter(ctx, filter, limit, offset)
	if err != nil {
		return nil, 0, err
	}

	total, err := s.employees.CountWithFilter(ctx, filter)
	if err != nil {
		return nil, 0, err
	}

	// Convert to pointers
	result := make([]*model.Employee, len(employees))
	for i := range employees {
		result[i] = &employees[i]
	}

	return result, total, nil
}
