import React from 'react';
import { Table, Tag, Button, Avatar, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

export interface EmployeeRow {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
  avatar?: string;
}

interface EmployeeTableProps {
  employees: EmployeeRow[];
  selectedRowKeys: React.Key[];
  onSelectedChange: (keys: React.Key[]) => void;
}

const getStatusStyle = (status: EmployeeRow['status']): React.CSSProperties => {
  switch (status) {
    case 'Active':
      return { background: 'rgba(34,197,94,0.10)', color: 'rgb(22,163,74)', borderColor: 'transparent' };
    case 'On Leave':
      return { background: 'rgba(249,115,22,0.10)', color: 'rgb(234,88,12)', borderColor: 'transparent' };
    case 'Inactive':
      return { background: 'rgba(107,114,128,0.10)', color: 'rgb(75,85,99)', borderColor: 'transparent' };
    default:
      return { background: 'rgba(107,114,128,0.10)', color: 'rgb(75,85,99)' };
  }
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, selectedRowKeys, onSelectedChange }) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => onSelectedChange(newSelectedRowKeys),
    columnWidth: 48,
    columnTitle: false,
    columnAlign: 'center',
  };
  const columns: ColumnsType<EmployeeRow> = [
    {
      title: 'EMPLOYEE',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record) => {
        const initials = (record.name || '')
          .split(' ')
          .map(part => part.charAt(0))
          .join('')
          .toUpperCase();
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: 8 }}>{record.avatar || initials}</Avatar>
            <div>
              <div style={{ fontWeight: 500 }}>{record.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{record.email}</div>
            </div>
          </div>
        );
      },
    },
    { title: 'EMPLOYEE ID', dataIndex: 'id', key: 'id' },
    { title: 'DEPARTMENT', dataIndex: 'department', key: 'department' },
    { title: 'POSITION', dataIndex: 'position', key: 'position' },
    { title: 'JOIN DATE', dataIndex: 'joinDate', key: 'joinDate' },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: EmployeeRow['status']) => <Tag style={getStatusStyle(status)}>{status}</Tag>,
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowSelection={rowSelection}
      pagination={false}
      columns={columns}
      dataSource={employees}
      bordered
      className="employee-table"
    />
  )
  
};

export default EmployeeTable;


