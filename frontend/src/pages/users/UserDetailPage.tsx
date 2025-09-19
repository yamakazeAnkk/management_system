import React from 'react';
import { Card, Descriptions, Tag, Button, Space } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Layout } from '../../components';

const UserDetailPage: React.FC = () => {
  // Mock data
  const user = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    phone: '0123456789',
    isActive: true,
    roles: [{ id: '1', name: 'Admin' }],
    department: { id: '1', name: 'IT' },
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

        <Card title="Thông tin chi tiết người dùng">
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Tên đăng nhập">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Họ tên">{user.firstName} {user.lastName}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Phòng ban">{user.department?.name}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={user.isActive ? 'green' : 'red'}>
                {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Vai trò" span={2}>
              {user.roles.map(role => (
                <Tag key={role.id} color="blue">{role.name}</Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{new Date(user.createdAt).toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label="Cập nhật lần cuối">{new Date(user.updatedAt).toLocaleDateString()}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDetailPage;
