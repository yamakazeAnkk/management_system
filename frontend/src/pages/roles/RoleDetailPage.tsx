import React from 'react';
import { Card, Descriptions, Tag, Button, Space } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Layout } from '../../components';

const RoleDetailPage: React.FC = () => {
  const role = {
    id: '1',
    name: 'Admin',
    description: 'Quản trị viên hệ thống',
    isActive: true,
    permissions: [
      { id: '1', name: 'Quản lý người dùng', resource: 'users', action: 'manage' },
      { id: '2', name: 'Quản lý vai trò', resource: 'roles', action: 'manage' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  return (
    <Layout>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
        </Space>

        <Card title="Thông tin chi tiết vai trò">
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Tên vai trò">{role.name}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{role.description}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={role.isActive ? 'green' : 'red'}>
                {role.isActive ? 'Hoạt động' : 'Không hoạt động'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Quyền hạn" span={2}>
              {role.permissions.map(permission => (
                <Tag key={permission.id} color="blue">{permission.name}</Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{new Date(role.createdAt).toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label="Cập nhật lần cuối">{new Date(role.updatedAt).toLocaleDateString()}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Layout>
  );
};

export default RoleDetailPage;
