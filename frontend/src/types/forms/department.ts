export interface DepartmentFormData {
  name: string;
  description?: string;
  parentId?: string;
  managerId?: string;
  isActive: boolean;
}

export interface CreateDepartmentFormData extends DepartmentFormData {}

export interface UpdateDepartmentFormData extends DepartmentFormData {
  id: string;
}

export interface DepartmentSearchFormData {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  parentId?: string;
}

export interface DepartmentBulkActionFormData {
  action: 'delete' | 'activate' | 'deactivate';
  departmentIds: string[];
}
