import React from 'react';
import { Row, Col, Statistic, Card, Table, Tag, Space, Button, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuthSimple from '../../hooks/auth/useAuthSimple';
import { ROUTES } from '../../constants/routes/paths';
import {
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  BankOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthSimple();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };
  // Mock data
  const statistics = [
    {
      title: 'Tổng người dùng',
      value: 1234,
      icon: <UserOutlined style={{ color: '#1890ff' }} />,
      color: '#1890ff',
    },
    {
      title: 'Vai trò',
      value: 8,
      icon: <SafetyOutlined style={{ color: '#52c41a' }} />,
      color: '#52c41a',
    },
    {
      title: 'Phòng ban',
      value: 12,
      icon: <BankOutlined style={{ color: '#faad14' }} />,
      color: '#faad14',
    },
    {
      title: 'Hoạt động hôm nay',
      value: 56,
      icon: <TeamOutlined style={{ color: '#f5222d' }} />,
      color: '#f5222d',
    },
  ];

  const recentUsersColumns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      key: 'fullName',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      key: 'roles',
      dataIndex: 'roles',
      render: (roles) => (
        <Space>
          {roles.map((role) => (
            <Tag key={role.id} color="blue">
              {role.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const recentUsersData = [
    {
      key: '1',
      username: 'admin',
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      email: 'admin@example.com',
      roles: [{ id: '1', name: 'Admin' }],
      isActive: true,
    },
    {
      key: '2',
      username: 'user1',
      firstName: 'Trần',
      lastName: 'Thị B',
      email: 'user1@example.com',
      roles: [{ id: '2', name: 'User' }],
      isActive: true,
    },
    {
      key: '3',
      username: 'manager1',
      firstName: 'Lê',
      lastName: 'Văn C',
      email: 'manager1@example.com',
      roles: [{ id: '3', name: 'Manager' }],
      isActive: false,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Layout.Content style={{ padding: '24px' }}>
        <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 24 
        }}>
          <Typography.Title level={1} style={{ margin: 0 }}>
            Dashboard
          </Typography.Title>
                 <Button
                   type="primary"
                   danger
                   icon={<LogoutOutlined />}
                   onClick={handleLogout}
                 >
                   Đăng xuất
                 </Button>
        </div>
        
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          {statistics.map((stat, index) => (
            <Col span={6} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Recent Users Table */}
        <Card
          title="Người dùng gần đây"
          extra={
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm người dùng
            </Button>
          }
        >
          <Table
            columns={recentUsersColumns}
            dataSource={recentUsersData}
            pagination={{ pageSize: 5 }}
            size="small"
          />
        </Card>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default DashboardPage;
