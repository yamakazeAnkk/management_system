export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // User endpoints
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  USER_PROFILE: '/users/profile',
  USER_ROLES: (id: string) => `/users/${id}/roles`,
  
  // Role endpoints
  ROLES: '/roles',
  ROLE_BY_ID: (id: string) => `/roles/${id}`,
  ROLE_PERMISSIONS: (id: string) => `/roles/${id}/permissions`,
  
  // Department endpoints
  DEPARTMENTS: '/departments',
  DEPARTMENT_BY_ID: (id: string) => `/departments/${id}`,
  DEPARTMENT_USERS: (id: string) => `/departments/${id}/users`,
  
  // Permission endpoints
  PERMISSIONS: '/permissions',
  
  // File upload endpoints
  UPLOAD_AVATAR: '/upload/avatar',
  UPLOAD_DOCUMENT: '/upload/document',
} as const;
