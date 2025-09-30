import React from 'react';
import { Table, Tag, Button, Avatar, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { employeeProfiles } from '../Data';
import { useNavigate } from 'react-router-dom';

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

const EmployeeTable: React.FC<EmployeeTableProps> = ({ selectedRowKeys, onSelectedChange }) => {
  const navigate = useNavigate();
  // Prefer richer mock dataset from employeeProfiles as requested; map only needed fields
  const dataRows: EmployeeRow[] = React.useMemo(() => {
    return employeeProfiles.map((p, index) => ({
      key: String(index + 1),
      id: p.id,
      name: p.name,
      email: p.email,
      phone: p.phone,
      department: p.department,
      position: p.position,
      status: p.status,
      joinDate: p.joinDate,
    }))
  }, [])
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
      render: (_: unknown, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} onClick={() => navigate(`/employees/${record.id}`)} />
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
      dataSource={dataRows}
      bordered
      className="employee-table"
    />
  )
  
};

export default EmployeeTable;


