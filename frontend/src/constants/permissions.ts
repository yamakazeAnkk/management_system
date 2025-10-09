import { 
  TeamOutlined, 
  UserAddOutlined, 
  ClockCircleOutlined, 
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { PermissionCategory } from '../types/api/role';

export const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    id: 'employee-management',
    name: 'Employee Management',
    icon: 'TeamOutlined',
    color: '#1890ff',
    permissions: [
      {
        id: 'employee.view',
        key: 'employee.view',
        name: 'View all employees',
        resource: 'employee',
        action: 'view',
        module: 'employee-management',
        description: 'Access employee directory and profiles',
        isActive: true
      },
      {
        id: 'employee.create',
        key: 'employee.create',
        name: 'Add new employees',
        resource: 'employee',
        action: 'create',
        module: 'employee-management',
        description: 'Create new employee records',
        isActive: true
      },
      {
        id: 'employee.update',
        key: 'employee.update',
        name: 'Edit employee information',
        resource: 'employee',
        action: 'update',
        module: 'employee-management',
        description: 'Update employee details and information',
        isActive: true
      },
      {
        id: 'employee.delete',
        key: 'employee.delete',
        name: 'Delete employees',
        resource: 'employee',
        action: 'delete',
        module: 'employee-management',
        description: 'Remove employee records from system',
        isActive: true
      },
      {
        id: 'employee.export',
        key: 'employee.export',
        name: 'Export employee data',
        resource: 'employee',
        action: 'export',
        module: 'employee-management',
        description: 'Download employee information',
        isActive: true
      }
    ]
  },
  {
    id: 'recruitment',
    name: 'Recruitment',
    icon: 'UserAddOutlined',
    color: '#722ed1',
    permissions: [
      {
        id: 'recruitment.job.view',
        key: 'recruitment.job.view',
        name: 'View job postings',
        resource: 'job',
        action: 'view',
        module: 'recruitment',
        description: 'Access all job listings',
        isActive: true
      },
      {
        id: 'recruitment.job.create',
        key: 'recruitment.job.create',
        name: 'Create job postings',
        resource: 'job',
        action: 'create',
        module: 'recruitment',
        description: 'Post new job opportunities',
        isActive: true
      },
      {
        id: 'recruitment.candidate.view',
        key: 'recruitment.candidate.view',
        name: 'Review candidates',
        resource: 'candidate',
        action: 'view',
        module: 'recruitment',
        description: 'Access candidate applications and profiles',
        isActive: true
      },
      {
        id: 'recruitment.interview.schedule',
        key: 'recruitment.interview.schedule',
        name: 'Schedule interviews',
        resource: 'interview',
        action: 'schedule',
        module: 'recruitment',
        description: 'Arrange and manage interview schedules',
        isActive: true
      },
      {
        id: 'recruitment.offer.send',
        key: 'recruitment.offer.send',
        name: 'Send offers',
        resource: 'offer',
        action: 'send',
        module: 'recruitment',
        description: 'Create and send employment offers',
        isActive: true
      }
    ]
  },
  {
    id: 'attendance-time',
    name: 'Attendance & Time',
    icon: 'ClockCircleOutlined',
    color: '#52c41a',
    permissions: [
      {
        id: 'attendance.view',
        key: 'attendance.view',
        name: 'View attendance records',
        resource: 'attendance',
        action: 'view',
        module: 'attendance-time',
        description: 'Access employee attendance and time tracking',
        isActive: true
      },
      {
        id: 'attendance.manage',
        key: 'attendance.manage',
        name: 'Manage attendance',
        resource: 'attendance',
        action: 'manage',
        module: 'attendance-time',
        description: 'Approve, reject, or modify attendance records',
        isActive: true
      },
      {
        id: 'timesheet.view',
        key: 'timesheet.view',
        name: 'View timesheets',
        resource: 'timesheet',
        action: 'view',
        module: 'attendance-time',
        description: 'Access employee timesheet data',
        isActive: true
      },
      {
        id: 'timesheet.approve',
        key: 'timesheet.approve',
        name: 'Approve timesheets',
        resource: 'timesheet',
        action: 'approve',
        module: 'attendance-time',
        description: 'Review and approve employee timesheets',
        isActive: true
      }
    ]
  },
  {
    id: 'leave-management',
    name: 'Leave Management',
    icon: 'CalendarOutlined',
    color: '#fa8c16',
    permissions: [
      {
        id: 'leave.view',
        key: 'leave.view',
        name: 'View leave requests',
        resource: 'leave',
        action: 'view',
        module: 'leave-management',
        description: 'Access employee leave requests and history',
        isActive: true
      },
      {
        id: 'leave.approve',
        key: 'leave.approve',
        name: 'Approve leave requests',
        resource: 'leave',
        action: 'approve',
        module: 'leave-management',
        description: 'Approve or reject employee leave requests',
        isActive: true
      },
      {
        id: 'leave.policy.manage',
        key: 'leave.policy.manage',
        name: 'Manage leave policies',
        resource: 'leave-policy',
        action: 'manage',
        module: 'leave-management',
        description: 'Create and update leave policies',
        isActive: true
      }
    ]
  },
  {
    id: 'payroll',
    name: 'Payroll',
    icon: 'DollarOutlined',
    color: '#f5222d',
    permissions: [
      {
        id: 'payroll.view',
        key: 'payroll.view',
        name: 'View payroll data',
        resource: 'payroll',
        action: 'view',
        module: 'payroll',
        description: 'Access payroll information and reports',
        isActive: true
      },
      {
        id: 'payroll.process',
        key: 'payroll.process',
        name: 'Process payroll',
        resource: 'payroll',
        action: 'process',
        module: 'payroll',
        description: 'Execute payroll calculations and payments',
        isActive: true
      },
      {
        id: 'salary.manage',
        key: 'salary.manage',
        name: 'Manage salaries',
        resource: 'salary',
        action: 'manage',
        module: 'payroll',
        description: 'Update employee salary information',
        isActive: true
      }
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'TrophyOutlined',
    color: '#eb2f96',
    permissions: [
      {
        id: 'performance.view',
        key: 'performance.view',
        name: 'View performance reviews',
        resource: 'performance',
        action: 'view',
        module: 'performance',
        description: 'Access employee performance data',
        isActive: true
      },
      {
        id: 'performance.manage',
        key: 'performance.manage',
        name: 'Manage performance reviews',
        resource: 'performance',
        action: 'manage',
        module: 'performance',
        description: 'Create and conduct performance evaluations',
        isActive: true
      },
      {
        id: 'goal.manage',
        key: 'goal.manage',
        name: 'Manage goals',
        resource: 'goal',
        action: 'manage',
        module: 'performance',
        description: 'Set and track employee goals',
        isActive: true
      }
    ]
  },
  {
    id: 'reports-analytics',
    name: 'Reports & Analytics',
    icon: 'BarChartOutlined',
    color: '#13c2c2',
    permissions: [
      {
        id: 'report.view',
        key: 'report.view',
        name: 'View reports',
        resource: 'report',
        action: 'view',
        module: 'reports-analytics',
        description: 'Access various system reports',
        isActive: true
      },
      {
        id: 'report.create',
        key: 'report.create',
        name: 'Create custom reports',
        resource: 'report',
        action: 'create',
        module: 'reports-analytics',
        description: 'Build and customize reports',
        isActive: true
      },
      {
        id: 'analytics.view',
        key: 'analytics.view',
        name: 'View analytics',
        resource: 'analytics',
        action: 'view',
        module: 'reports-analytics',
        description: 'Access analytics dashboards',
        isActive: true
      }
    ]
  },
  {
    id: 'system-settings',
    name: 'System Settings',
    icon: 'SettingOutlined',
    color: '#595959',
    permissions: [
      {
        id: 'system.user.manage',
        key: 'system.user.manage',
        name: 'Manage users',
        resource: 'user',
        action: 'manage',
        module: 'system-settings',
        description: 'Create, update, and manage system users',
        isActive: true
      },
      {
        id: 'system.role.manage',
        key: 'system.role.manage',
        name: 'Manage roles',
        resource: 'role',
        action: 'manage',
        module: 'system-settings',
        description: 'Create and manage user roles and permissions',
        isActive: true
      },
      {
        id: 'system.department.manage',
        key: 'system.department.manage',
        name: 'Manage departments',
        resource: 'department',
        action: 'manage',
        module: 'system-settings',
        description: 'Create and manage organizational departments',
        isActive: true
      },
      {
        id: 'system.config.manage',
        key: 'system.config.manage',
        name: 'Manage system configuration',
        resource: 'config',
        action: 'manage',
        module: 'system-settings',
        description: 'Configure system-wide settings',
        isActive: true
      }
    ]
  }
];

export const ROLE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'associate', label: 'Associate' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'manager', label: 'Manager' },
  { value: 'director', label: 'Director' },
  { value: 'vp', label: 'VP' },
  { value: 'c-level', label: 'C-Level' }
];

export const SESSION_TIMEOUT_OPTIONS = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 120, label: '2 hours' },
  { value: 240, label: '4 hours' },
  { value: 480, label: '8 hours' },
  { value: 1440, label: '24 hours' }
];

export const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    TeamOutlined,
    UserAddOutlined,
    ClockCircleOutlined,
    CalendarOutlined,
    DollarOutlined,
    TrophyOutlined,
    BarChartOutlined,
    SettingOutlined
  };
  return iconMap[iconName] || TeamOutlined;
};
