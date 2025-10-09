import React from 'react';
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Popconfirm,
  Row,
  Col,
  Avatar,
  Switch,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Role } from '../data/role';

const { Search } = Input;

interface RolesTableProps {
  roles: Role[];
  loading: boolean;
  searchText: string;
  onSearchChange: (value: string) => void; // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedRowKeys: React.Key[];
  onSelectionChange: (keys: React.Key[]) => void; // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEdit: (record: Role) => void; // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDelete: (record: Role) => void; // eslint-disable-next-line @typescript-eslint/no-unused-vars
}

const RolesTable: React.FC<RolesTableProps> = ({
  roles,
  loading,
  selectedRowKeys,
  onSelectionChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Role, b: Role) => a.name.localeCompare(b.name),
      render: (text: string, record: Role) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar 
            size={40} 
            style={{ 
              backgroundColor: record.isSystem ? '#722ed1' : '#1890ff',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {text.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500, color: '#1f2937' }}>{text}</div>
            {record.description && (
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                {record.description}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department: string) => (
        <span style={{ color: '#6b7280', fontSize: '14px' }}>
          {department || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Users',
      key: 'users',
      render: (_: unknown, record: Role) => {
        const users = record.users || [];
        const totalUsers = record.usersAssigned || 0;
        
        if (totalUsers === 0) {
          return (
            <div style={{ textAlign: 'center', color: '#9ca3af' }}>
              <UserOutlined style={{ fontSize: '20px' }} />
              <div style={{ fontSize: '12px', marginTop: '4px' }}>No users</div>
            </div>
          );
        }
        
        // Nếu có ít hơn hoặc bằng 3 users, hiển thị tất cả avatars
        if (totalUsers <= 3) {
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {users.slice(0, totalUsers).map((user, _index) => (
                <Tooltip key={user.id} title={user.name}>
                  <Avatar 
                    size={32} 
                    src={user.avatar}
                    style={{ border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </div>
          );
        }
        
        // Nếu có nhiều hơn 3 users, hiển thị 2 avatars + số còn lại
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {users.slice(0, 2).map((user, _index) => (
              <Tooltip key={user.id} title={user.name}>
                <Avatar 
                  size={32} 
                  src={user.avatar}
                  style={{ border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
            <Avatar 
              size={32} 
              style={{ 
                backgroundColor: '#f3f4f6', 
                color: '#6b7280',
                fontSize: '12px',
                fontWeight: 'bold',
                border: '2px solid #fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              +{totalUsers - 2}
            </Avatar>
          </div>
        );
      },
    },
    {
      title: 'Permission',
      key: 'permissionKeys',
      dataIndex: 'permissionKeys',
      render: (permissionKeys: string[]) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {permissionKeys.length} permissions
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {permissionKeys.slice(0, 2).map((permission) => (
              <Tag key={permission} color="blue" style={{ fontSize: '10px', margin: 0 }}>
                {permission.split('.').pop()}
              </Tag>
            ))}
            {permissionKeys.length > 2 && (
              <Tag color="default" style={{ fontSize: '10px', margin: 0 }}>
                +{permissionKeys.length - 2}
              </Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'isSystem',
      key: 'type',
      render: (isSystem: boolean) => (
        <Tag color={isSystem ? 'purple' : 'green'}>
          {isSystem ? 'System' : 'Custom'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean, _record: Role) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Switch 
            checked={isActive}
            size="small"
            style={{
              backgroundColor: isActive ? '#000000' : '#d1d5db',
            }}
          />
          <span style={{ 
            fontSize: '12px', 
            color: isActive ? '#059669' : '#6b7280',
            fontWeight: 500
          }}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value: boolean, record: Role) => record.isActive === value,
    },
    {
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A'}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {date ? new Date(date).toLocaleTimeString('vi-VN') : 'N/A'}
          </div>
        </div>
      ),
      sorter: (a: Role, b: Role) => {
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateA - dateB;
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (_: unknown, record: Role) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ padding: '4px 8px', color: '#000' }}
            aria-label="Edit Role"
          />
          <Popconfirm
            title="Delete Role"
            description="Are you sure you want to delete this role?"
            onConfirm={() => onDelete(record)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
              style={{ padding: '4px 8px' }}
              aria-label="Delete Role"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
  };

  return (
    <Card title="Roles List" style={{ marginTop: 16, padding: 0 }} bodyStyle={{ padding: 0 }}>
     

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        loading={loading}
        rowSelection={rowSelection}
        pagination={{
          total: roles.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: 'max-content' }}
      />
    </Card>
  );
};

export default RolesTable;
