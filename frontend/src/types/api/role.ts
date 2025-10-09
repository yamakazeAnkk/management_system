export interface Role {
  id: string;
  name: string;
  code: string; // ROLE_ADMIN, ROLE_HR_MANAGER, etc.
  description: string;
  category: 'system' | 'business' | 'department';
  isSystem: boolean;
  isActive: boolean;
  hierarchy: RoleHierarchy;
  permissions: RolePermissions;
  securitySettings: RoleSecuritySettings;
  usage: RoleUsage;
  metadata: RoleMetadata;
}

export interface RoleHierarchy {
  level: number; // 1=entry, 2=associate, 3=lead, 4=manager, 5=director, 6=c-level
  reportsTo?: string; // reference to parent role
  departmentScope: 'all' | 'specific' | 'none';
}

export interface RolePermissions {
  permissionIds: string[];
  inheritedFrom: string[]; // parent roles
  customPermissions: string[]; // additional permissions
}

export interface RoleSecuritySettings {
  requireTwoFactor: boolean;
  allowApiAccess: boolean;
  sessionTimeout: number; // minutes
  maxConcurrentSessions: number;
}

export interface RoleUsage {
  userCount: number;
  lastAssignedAt?: string;
}

export interface RoleMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
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
  code: string;
  description: string;
  category: 'system' | 'business' | 'department';
  isSystem: boolean;
  hierarchy: Omit<RoleHierarchy, 'reportsTo'> & { reportsTo?: string };
  permissions: Omit<RolePermissions, 'inheritedFrom'>;
  securitySettings: RoleSecuritySettings;
}

export interface UpdateRoleRequest {
  name?: string;
  code?: string;
  description?: string;
  category?: 'system' | 'business' | 'department';
  isSystem?: boolean;
  isActive?: boolean;
  hierarchy?: Partial<RoleHierarchy>;
  permissions?: Partial<RolePermissions>;
  securitySettings?: Partial<RoleSecuritySettings>;
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
