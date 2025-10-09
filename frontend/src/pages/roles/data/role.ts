
export interface Role {
  id: string;
  name: string;
  description?: string;
  department?: string;
  roleLevel?: string;
  reportsTo?: string;
  isSystem: boolean;
  permissionKeys: string[];
  isActive: boolean;
  requireTwoFactor?: boolean;
  allowApiAccess?: boolean;
  sessionTimeout?: number;
  usersAssigned?: number;
  users?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export type RoleSeed = {
  id: string;
  name: string;
  description: string;
  department: string;
  roleLevel: string;
  reportsTo?: string;
  isSystem: boolean;
  permissionKeys: string[];
  isActive: boolean;
  requireTwoFactor: boolean;
  allowApiAccess: boolean;
  sessionTimeout: number;
  usersAssigned: number;
  users: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export const initialRoleData: RoleSeed[] = [
  {
    id: "ROLE001",
    name: "System Administrator",
    description: "Full system access with all permissions",
    department: "IT",
    roleLevel: "c-level",
    reportsTo: "CEO",
    isSystem: true,
    permissionKeys: [
      "employee.view", "employee.create", "employee.update", "employee.delete", "employee.export",
      "recruitment.job.view", "recruitment.job.create", "recruitment.candidate.view", "recruitment.interview.schedule", "recruitment.offer.send",
      "attendance.view", "attendance.manage", "timesheet.view", "timesheet.approve",
      "leave.view", "leave.approve", "leave.policy.manage",
      "payroll.view", "payroll.process", "salary.manage",
      "performance.view", "performance.manage", "goal.manage",
      "report.view", "report.create", "analytics.view",
      "system.user.manage", "system.role.manage", "system.department.manage", "system.config.manage"
    ],
    isActive: true,
    requireTwoFactor: true,
    allowApiAccess: true,
    sessionTimeout: 480,
    usersAssigned: 2,
    users: [
      { id: "U001", name: "John Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
      { id: "U002", name: "Jane Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "ROLE002",
    name: "HR Manager",
    description: "Human resources management and employee lifecycle",
    department: "Human Resources",
    roleLevel: "manager",
    reportsTo: "HR Director",
    isSystem: false,
    permissionKeys: [
      "employee.view", "employee.create", "employee.update", "employee.export",
      "recruitment.job.view", "recruitment.job.create", "recruitment.candidate.view", "recruitment.interview.schedule", "recruitment.offer.send",
      "attendance.view", "attendance.manage",
      "leave.view", "leave.approve",
      "performance.view", "performance.manage",
      "report.view", "report.create"
    ],
    isActive: true,
    requireTwoFactor: false,
    allowApiAccess: false,
    sessionTimeout: 240,
    usersAssigned: 3,
    users: [
      { id: "U003", name: "Alice HR", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
      { id: "U004", name: "Bob HR", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
      { id: "U005", name: "Carol HR", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol" }
    ],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "ROLE003",
    name: "Team Lead",
    description: "Team leadership and project management",
    department: "Engineering",
    roleLevel: "lead",
    reportsTo: "Engineering Manager",
    isSystem: false,
    permissionKeys: [
      "employee.view",
      "attendance.view", "timesheet.view", "timesheet.approve",
      "leave.view", "leave.approve",
      "performance.view", "performance.manage", "goal.manage",
      "report.view"
    ],
    isActive: true,
    requireTwoFactor: false,
    allowApiAccess: false,
    sessionTimeout: 480,
    usersAssigned: 5,
    users: [
      { id: "U006", name: "David Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
      { id: "U007", name: "Eva Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva" },
      { id: "U008", name: "Frank Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank" },
      { id: "U009", name: "Grace Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace" },
      { id: "U010", name: "Henry Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry" }
    ],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z"
  },
  {
    id: "ROLE004",
    name: "Finance Manager",
    description: "Financial management and payroll processing",
    department: "Finance",
    roleLevel: "manager",
    reportsTo: "CFO",
    isSystem: false,
    permissionKeys: [
      "employee.view",
      "attendance.view", "timesheet.view", "timesheet.approve",
      "payroll.view", "payroll.process", "salary.manage",
      "report.view", "report.create", "analytics.view"
    ],
    isActive: true,
    requireTwoFactor: true,
    allowApiAccess: false,
    sessionTimeout: 120,
    usersAssigned: 3,
    users: [
      { id: "U011", name: "Grace Finance", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace" },
      { id: "U012", name: "Henry Finance", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry" },
      { id: "U013", name: "Ivy Finance", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivy" }
    ],
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z"
  },
  {
    id: "ROLE005",
    name: "Employee",
    description: "Basic employee access and self-service",
    department: "All",
    roleLevel: "entry",
    reportsTo: "Team Lead",
    isSystem: false,
    permissionKeys: [
      "employee.view",
      "attendance.view", "timesheet.view",
      "leave.view",
      "performance.view"
    ],
    isActive: true,
    requireTwoFactor: false,
    allowApiAccess: false,
    sessionTimeout: 480,
    usersAssigned: 3,
    users: [
      { id: "U014", name: "Jack Employee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" },
      { id: "U015", name: "Kate Employee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate" },
      { id: "U016", name: "Leo Employee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" }
    ],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "ROLE006",
    name: "Recruiter",
    description: "Recruitment and talent acquisition specialist",
    department: "Human Resources",
    roleLevel: "associate",
    reportsTo: "HR Manager",
    isSystem: false,
    permissionKeys: [
      "employee.view",
      "recruitment.job.view", "recruitment.job.create", "recruitment.candidate.view", "recruitment.interview.schedule", "recruitment.offer.send",
      "report.view"
    ],
    isActive: true,
    requireTwoFactor: false,
    allowApiAccess: false,
    sessionTimeout: 240,
    usersAssigned: 3,
    users: [
      { id: "U017", name: "Mia Recruiter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" },
      { id: "U018", name: "Noah Recruiter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah" },
      { id: "U019", name: "Olivia Recruiter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" }
    ],
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z"
  },
  {
    id: "ROLE007",
    name: "Guest User",
    description: "Limited access for external users",
    department: "External",
    roleLevel: "entry",
    isSystem: true,
    permissionKeys: [
      "employee.view"
    ],
    isActive: false,
    requireTwoFactor: false,
    allowApiAccess: false,
    sessionTimeout: 60,
    usersAssigned: 0,
    users: [],
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z"
  },
  {
    id: "ROLE008",
    name: "Department Head",
    description: "Department management and oversight",
    department: "All",
    roleLevel: "director",
    reportsTo: "VP",
    isSystem: false,
    permissionKeys: [
      "employee.view", "employee.create", "employee.update",
      "attendance.view", "attendance.manage", "timesheet.view", "timesheet.approve",
      "leave.view", "leave.approve",
      "performance.view", "performance.manage", "goal.manage",
      "report.view", "report.create", "analytics.view"
    ],
    isActive: false,
    requireTwoFactor: true,
    allowApiAccess: false,
    sessionTimeout: 240,
    usersAssigned: 3,
    users: [
      { id: "U020", name: "Paul Director", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paul" },
      { id: "U021", name: "Quinn Director", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn" },
      { id: "U022", name: "Rachel Director", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel" }
    ],
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z"
  }
];

// Helper functions for stats calculations
export const calculateRoleStats = (roles: RoleSeed[]) => {
  const totalRoles = roles.length;
  const activeRoles = roles.filter(role => role.isActive).length;
  const customRoles = roles.filter(role => !role.isSystem).length;
  const systemRoles = roles.filter(role => role.isSystem).length;
  
  return {
    total: totalRoles,
    active: activeRoles,
    inactive: totalRoles - activeRoles,
    custom: customRoles,
    system: systemRoles
  };
};

// Mock users assigned count for each role (this would come from API in real app)
export const mockUsersAssignedCount = {
  "ROLE001": 2,   // System Administrator
  "ROLE002": 3,   // HR Manager
  "ROLE003": 5,   // Team Lead
  "ROLE004": 3,   // Finance Manager
  "ROLE005": 3,   // Employee
  "ROLE006": 3,   // Recruiter
  "ROLE007": 0,   // Guest User
  "ROLE008": 3    // Department Head
};

export const getTotalUsersAssigned = () => {
  return Object.values(mockUsersAssignedCount).reduce((sum, count) => sum + count, 0);
};