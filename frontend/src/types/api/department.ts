export interface Department {
  id: string;
  name: string;
  code: string; // HR, IT, FINANCE, etc.
  description: string;
  parentDepartmentId?: string;
  parentDepartment?: Department;
  children?: Department[];
  managerId?: string;
  manager?: User;
  budgetCode: string;
  location: string;
  contactInfo: DepartmentContact;
  isActive: boolean;
  metadata: DepartmentMetadata;
}

export interface DepartmentContact {
  email: string;
  phone: string;
  address: string;
}

export interface DepartmentMetadata {
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentRequest {
  name: string;
  code: string;
  description: string;
  parentDepartmentId?: string;
  managerId?: string;
  budgetCode: string;
  location: string;
  contactInfo: DepartmentContact;
}

export interface UpdateDepartmentRequest {
  name?: string;
  code?: string;
  description?: string;
  parentDepartmentId?: string;
  managerId?: string;
  budgetCode?: string;
  location?: string;
  contactInfo?: Partial<DepartmentContact>;
  isActive?: boolean;
}

export interface DepartmentListResponse {
  departments: Department[];
  total: number;
  page: number;
  limit: number;
}

// Import types from other modules
import { User } from './user';
