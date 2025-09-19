export interface Department {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  parent?: Department;
  children?: Department[];
  managerId?: string;
  manager?: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
  parentId?: string;
  managerId?: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  description?: string;
  parentId?: string;
  managerId?: string;
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
