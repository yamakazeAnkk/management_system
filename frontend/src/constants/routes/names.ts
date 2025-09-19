export const ROUTE_NAMES = {
  // Auth routes
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
  
  // Dashboard routes
  DASHBOARD: 'dashboard',
  ANALYTICS: 'analytics',
  
  // User management routes
  USERS: 'users',
  USER_DETAIL: 'user-detail',
  CREATE_USER: 'create-user',
  EDIT_USER: 'edit-user',
  
  // Role management routes
  ROLES: 'roles',
  ROLE_DETAIL: 'role-detail',
  CREATE_ROLE: 'create-role',
  EDIT_ROLE: 'edit-role',
  
  // Department management routes
  DEPARTMENTS: 'departments',
  DEPARTMENT_DETAIL: 'department-detail',
  CREATE_DEPARTMENT: 'create-department',
  EDIT_DEPARTMENT: 'edit-department',
  
  // Profile routes
  PROFILE: 'profile',
  SETTINGS: 'settings',
} as const;
