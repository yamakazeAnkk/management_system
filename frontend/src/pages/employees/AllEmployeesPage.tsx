import React from 'react';
import { Table, Tag, Space, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Employee {
  key: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const mockData: Employee[] = [
  { key: '1', name: 'Sarah Johnson', email: 'sarah.johnson@example.com', department: 'HR', role: 'HR Manager', status: 'Active' },
  { key: '2', name: 'David Nguyen', email: 'david.nguyen@example.com', department: 'Engineering', role: 'Frontend Engineer', status: 'Active' },
  { key: '3', name: 'Emily Chen', email: 'emily.chen@example.com', department: 'Finance', role: 'Accountant', status: 'Inactive' },
];

const AllEmployeesPage: React.FC = () => {
  const columns: ColumnsType<Employee> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: Employee['status']) => (
        <Tag color={value === 'Active' ? 'green' : 'default'}>{value}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link">View</Button>
          <Button type="link">Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>All Employees</Typography.Title>
      <Table<Employee> columns={columns} dataSource={mockData} pagination={{ pageSize: 10 }} rowKey="key" />
    </div>
  );
};

export default AllEmployeesPage;


