import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import useAuthSimple from '../../hooks/auth/useAuthSimple';
import { ROUTES } from '../../constants/routes/paths';
import './auth.css';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginWithCredentials } = useAuthSimple();

  const handleSubmit = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginWithCredentials(values);
      
      if (result.success) {
        message.success('Đăng nhập thành công!');
        navigate(ROUTES.DASHBOARD);
      } else {
        setError(result.error || 'Đăng nhập thất bại');
      }
    } catch {
      setError('Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} className="auth-title">
              Management System
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Đăng nhập vào tài khoản của bạn
            </Text>
          </div>

          {error && (
            <Alert
              message="Lỗi đăng nhập"
              description={error}
              type="error"
              showIcon
            />
          )}
          
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tên đăng nhập"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                size="large"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Chưa có tài khoản?{' '}
              <Link to={ROUTES.REGISTER}>
                <Button type="link" style={{ padding: 0 }}>
                  Đăng ký ngay
                </Button>
              </Link>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;