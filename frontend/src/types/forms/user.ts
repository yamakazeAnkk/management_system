export interface UserFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  departmentId?: string;
  roleIds: string[];
  avatar?: string;
  isActive: boolean;
}

export interface CreateUserFormData extends UserFormData {
  password: string;
  confirmPassword: string;
}

export interface UpdateUserFormData extends UserFormData {
  id: string;
}

export interface UserSearchFormData {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  departmentId?: string;
  roleId?: string;
}

export interface UserBulkActionFormData {
  action: 'delete' | 'activate' | 'deactivate';
  userIds: string[];
}
