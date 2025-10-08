export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  ANALYTICS: '/dashboard/analytics',

  // User management routes
  USERS: '/users',
  USER_DETAIL: (id: string) => `/users/${id}`,
  CREATE_USER: '/users/create',
  EDIT_USER: (id: string) => `/users/${id}/edit`,

  // Role management routes
  ROLES: '/roles',
  ROLE_DETAIL: (id: string) => `/roles/${id}`,
  CREATE_ROLE: '/roles/create',
  EDIT_ROLE: (id: string) => `/roles/${id}/edit`,

  // Department management routes
  DEPARTMENTS: '/departments',
  DEPARTMENT_DETAIL: (id: string) => `/departments/${id}`,
  CREATE_DEPARTMENT: '/departments/create',
  EDIT_DEPARTMENT: (id: string) => `/departments/${id}/edit`,

  // Profile routes
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Recruitment routes
  CANDIDATES: '/recruitment/candidates',
  CANDIDATE_DETAIL: (id: string) => `/recruitment/candidates/${id}`,

  // Root route
  HOME: '/',
} as const;
