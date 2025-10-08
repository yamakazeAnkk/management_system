import React, { useMemo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  TeamOutlined,
  UserAddOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
  BarChartOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  ProfileOutlined,
  MessageOutlined,
} from '@ant-design/icons';

interface NavigationItem {
  title: string;
  key: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    icon: <BarChartOutlined />,
    href: '/dashboard',
  },
  {
    title: 'Employees',
    key: 'employees',
    icon: <TeamOutlined />,
    children: [
      { title: 'All Employees', key: 'employees-all', icon: <TeamOutlined />, href: '/employees' },
      { title: 'Add Employee', key: 'employees-add', icon: <UserAddOutlined />, href: '/employees/add' },
      { title: 'Employee Directory', key: 'employees-directory', icon: <FileTextOutlined />, href: '/employees/directory' },
    ],
  },
  {
    title: 'Recruitment',
    key: 'recruitment',
    icon: <UserAddOutlined />,
    children: [
      { title: 'Job Postings', key: 'recruitment-postings', icon: <TeamOutlined />, href: '/recruitment/postings' },
      { title: 'Job Candidates', key: 'recruitment-candidates', icon: <ProfileOutlined />, href: '/recruitment/candidates' },
    ],
  },
  {
    title: 'Attendance',
    key: 'attendance',
    icon: <ClockCircleOutlined />,
    children: [
      { title: 'Time Tracking', key: 'attendance-tracking', icon: <ClockCircleOutlined />, href: '/attendance/tracking' },
      { title: 'Leave Requests', key: 'attendance-leave', icon: <CalendarOutlined />, href: '/attendance/leave' },
      { title: 'Schedules', key: 'attendance-schedules', icon: <CalendarOutlined />, href: '/attendance/schedules' },
    ],
  },
  {
    title: 'Payroll',
    key: 'payroll',
    icon: <DollarOutlined />,
    children: [
      { title: 'Salary Management', key: 'payroll-salary', icon: <DollarOutlined />, href: '/payroll/salary' },
      { title: 'Payslips', key: 'payroll-payslips', icon: <FileTextOutlined />, href: '/payroll/payslips' },
      { title: 'Tax Documents', key: 'payroll-tax', icon: <FileTextOutlined />, href: '/payroll/tax' },
    ],
  },
  {
    title: 'Performance',
    key: 'performance',
    icon: <TrophyOutlined />,
    children: [
      { title: 'Reviews', key: 'performance-reviews', icon: <TrophyOutlined />, href: '/performance/reviews' },
      { title: 'Goals', key: 'performance-goals', icon: <TrophyOutlined />, href: '/performance/goals' },
      { title: 'Feedback', key: 'performance-feedback', icon: <MessageOutlined />, href: '/performance/feedback' },
    ],
  },
  {
    title: 'Reports',
    key: 'reports',
    icon: <BarChartOutlined />,
    href: '/reports',
  },
  {
    title: 'Settings',
    key: 'settings',
    icon: <SettingOutlined />,
    href: '/settings',
  },
];

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();
  // Convert to antd Menu items structure
  const toMenuItems = (
    items: NavigationItem[],
  ): { key: string; icon?: React.ReactNode; label: React.ReactNode; children?: { key: string; icon?: React.ReactNode; label: React.ReactNode }[] }[] =>
    items.map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.title,
          children: toMenuItems(item.children),
        };
      }
      return {
        key: item.key,
        icon: item.icon,
        label: item.href ? <Link to={item.href}>{item.title}</Link> : item.title,
      };
    });

  // selected key by current location
  const selectedKey = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith('/employees')) return 'employees-all';
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/recruitment/candidates')) return 'recruitment-candidates';
    if (path.startsWith('/recruitment/postings')) return 'recruitment-postings';
    if (path.startsWith('/recruitment')) return 'recruitment-candidates';
    return undefined;
  }, [location.pathname]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      inlineCollapsed={isCollapsed}
      selectedKeys={selectedKey ? [selectedKey] : []}
      selectable={true}
      items={toMenuItems(navigationItems)}
      style={{
        background: 'var(--color-sidebar-bg)',
        color: 'var(--color-sidebar-text)',
        borderRight: 'none',
      }}
    />
  );
}
