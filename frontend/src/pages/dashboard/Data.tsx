import React from 'react';
import { UserOutlined, ClockCircleOutlined, FileTextOutlined, DollarOutlined, PlusOutlined, CreditCardOutlined, BarChartOutlined, StarOutlined } from '@ant-design/icons';
import type { StatItem } from './components/DashboardStats';
import { NotificationItem } from './components/Notifications';

export const statistics: StatItem[] = [
  {
    title: 'Total Employees',
    value: 247,
    subtitle: '+12 this month',
    icon: <UserOutlined style={{ color: '#111' }} />,
    color: '#111111',
  },
  {
    title: 'Present Today',
    value: 231,
    subtitle: '93.5% attendance rate',
    icon: <ClockCircleOutlined style={{ color: '#111' }} />,
    color: '#111111',
  },
  {
    title: 'Pending Leave',
    value: 18,
    subtitle: 'Requires approval',
    icon: <FileTextOutlined style={{ color: '#111' }} />,
    color: '#111111',
  },
  {
    title: 'Monthly Payroll',
    value: 1.2,
    subtitle: 'Next run: Jan 30',
    icon: <DollarOutlined style={{ color: '#111' }} />,
    color: '#111111',
  },
];
  
export type RecentActivity = { title: string; time: string };

export const recentActivities: RecentActivity[] = [
  { title: 'John Smith joined Marketing Department', time: '2 hours ago' },
  { title: 'Sarah Wilson submitted leave request', time: '4 hours ago' },
  { title: 'Performance review cycle started', time: '1 day ago' },
  { title: 'Monthly payroll processed', time: '3 days ago' },
];
  
export const departments = [
    {
      name: "Engineering",
      employees: 45,
      percentage: 18.2,
      color: "#000000",
      avatar: "E",
    },
    {
      name: "Marketing",
      employees: 32,
      percentage: 13.0,
      color: "#000000",
      avatar: "M",
    },
    {
      name: "Sales",
      employees: 28,
      percentage: 11.3,
      color: "#000000",
      avatar: "S",
    },
    {
      name: "HR",
      employees: 12,
      percentage: 4.9,
      color: "#000000",
      avatar: "H",
    },
];
  
export const quickActions: { title: string; icon: React.ReactNode; href: string }[] = [
  { title: 'Add Employee', icon: <PlusOutlined />, href: '/employees/add' },
  { title: 'Process Payroll', icon: <CreditCardOutlined />, href: '/payroll/process' },
  { title: 'Generate Report', icon: <BarChartOutlined />, href: '/reports/generate' },
  { title: 'Performance Review', icon: <StarOutlined />, href: '/performance/review' },
];



export const notifications: NotificationItem[] = [
  {
    id: 1,
    title: 'New Employee Onboarding',
    message: '3 new employees starting next week',
    time: '5 min ago',
    type: 'info',
    unread: true,
  },
  {
    id: 2,
    title: 'Payroll Reminder',
    message: 'Monthly payroll processing due in 2 days',
    time: '1 hour ago',
    type: 'warning',
    unread: true,
  },
  {
    id: 3,
    title: 'Performance Reviews',
    message: '15 performance reviews completed this week',
    time: '3 hours ago',
    type: 'success',
    unread: false,
  },
];
export const topPerformers = [
    {
      name: "Sarah Johnson",
      department: "Engineering",
      score: 98,
      avatar: "SJ",
      improvement: "+5%",
    },
    {
      name: "Michael Chen",
      department: "Marketing",
      score: 95,
      avatar: "MC",
      improvement: "+3%",
    },
    {
      name: "Emily Davis",
      department: "Sales",
      score: 92,
      avatar: "ED",
      improvement: "+7%",
    },
  ]
  export const upcomingEvents = [
    {
      id: 1,
      title: "Team Building Event",
      date: "Jan 15, 2024",
      time: "2:00 PM",
      location: "Conference Room A",
      attendees: 25,
    },
    {
      id: 2,
      title: "Monthly All-Hands",
      date: "Jan 20, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      attendees: 247,
    },
    {
      id: 3,
      title: "HR Policy Training",
      date: "Jan 25, 2024",
      time: "9:00 AM",
      location: "Training Room B",
      attendees: 45,
    },
  ]


export default {};