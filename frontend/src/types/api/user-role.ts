export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  assignmentType: 'primary' | 'secondary' | 'temporary';
  scope: UserRoleScope;
  effectiveDates: UserRoleDates;
  assignedBy?: string;
  notes: string;
  isActive: boolean;
  metadata: UserRoleMetadata;
}

export interface UserRoleScope {
  departmentId?: string; // null = organization-wide
  locationCode: string;
  projectIds: string[];
}

export interface UserRoleDates {
  assignedAt: string;
  effectiveFrom: string;
  effectiveTo?: string; // null = permanent
}

export interface UserRoleMetadata {
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRoleRequest {
  userId: string;
  roleId: string;
  assignmentType: 'primary' | 'secondary' | 'temporary';
  scope: UserRoleScope;
  effectiveDates: Omit<UserRoleDates, 'assignedAt'>;
  notes?: string;
}

export interface UpdateUserRoleRequest {
  assignmentType?: 'primary' | 'secondary' | 'temporary';
  scope?: Partial<UserRoleScope>;
  effectiveDates?: Partial<UserRoleDates>;
  notes?: string;
  isActive?: boolean;
}

export interface UserRoleListResponse {
  userRoles: UserRole[];
  total: number;
  page: number;
  limit: number;
}
