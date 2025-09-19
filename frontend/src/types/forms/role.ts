export interface RoleFormData {
  name: string;
  description?: string;
  permissionIds: string[];
  isActive: boolean;
}

export interface CreateRoleFormData extends RoleFormData {}

export interface UpdateRoleFormData extends RoleFormData {
  id: string;
}

export interface RoleSearchFormData {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
}

export interface RoleBulkActionFormData {
  action: 'delete' | 'activate' | 'deactivate';
  roleIds: string[];
}
