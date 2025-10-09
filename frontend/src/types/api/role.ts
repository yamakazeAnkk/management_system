export interface Role {
  id: string;
  name: string;
  description?: string;
  department?: string;
  roleLevel?: string;
  reportsTo?: string;
  permissions: Permission[];
  isActive: boolean;
  requireTwoFactor?: boolean;
  allowApiAccess?: boolean;
  sessionTimeout?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  key: string;
  name: string;
  resource: string;
  action: string;
  module: string;
  description?: string;
  isActive: boolean;
}

export interface PermissionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  permissions: Permission[];
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  department?: string;
  roleLevel?: string;
  reportsTo?: string;
  permissionIds: string[];
  requireTwoFactor?: boolean;
  allowApiAccess?: boolean;
  sessionTimeout?: number;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  department?: string;
  roleLevel?: string;
  reportsTo?: string;
  permissionIds?: string[];
  isActive?: boolean;
  requireTwoFactor?: boolean;
  allowApiAccess?: boolean;
  sessionTimeout?: number;
}

export interface RoleListResponse {
  roles: Role[];
  total: number;
  page: number;
  limit: number;
}

export interface RoleFormData {
  name: string;
  description: string;
  department: string;
  roleLevel: string;
  reportsTo: string;
  permissions: string[];
  isActive: boolean;
  requireTwoFactor: boolean;
  allowApiAccess: boolean;
  sessionTimeout: number;
}
