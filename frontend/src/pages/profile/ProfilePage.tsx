import React from 'react';
import { Card, Descriptions, Button, Space, Avatar } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';

const ProfilePage: React.FC = () => {
  const user = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    phone: '0123456789',
    avatar: null,
    department: { id: '1', name: 'IT' },
    roles: [{ id: '1', name: 'Admin' }],
    createdAt: '2024-01-01T00:00:00Z',
  };

  return (
    <div>
      <div>
        <Card title="Thông tin cá nhân">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={80} icon={<UserOutlined />} src={user.avatar} />
              <div style={{ marginTop: 16 }}>
                <Button type="primary" icon={<EditOutlined />}>
                  Chỉnh sửa thông tin
                </Button>
              </div>
            </div>

            <Descriptions column={2} bordered>
              <Descriptions.Item label="Tên đăng nhập">{user.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Họ tên">{user.firstName} {user.lastName}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="Phòng ban">{user.department?.name}</Descriptions.Item>
              <Descriptions.Item label="Vai trò">
                {user.roles.map(role => (
                  <span key={role.id} style={{ marginRight: 8 }}>{role.name}</span>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tham gia">{new Date(user.createdAt).toLocaleDateString()}</Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
