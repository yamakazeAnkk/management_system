import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { RegisterFormData } from '../../types/forms/auth';
import './auth.css';

const { Title, Text } = Typography;

interface RegisterPageProps {
  onBackToLogin?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  
  // Mock register function

  const handleSubmit = async (values: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock register logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Register attempt:', values);
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      
      // Chuyển về trang đăng nhập sau khi đăng ký thành công
      setTimeout(() => {
        if (onBackToLogin) {
          onBackToLogin();
        }
      }, 1500);
    } catch {
      setError('Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card register">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} className="auth-title">
              Đăng ký tài khoản
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Tạo tài khoản mới để sử dụng hệ thống
            </Text>
          </div>

          {error && (
            <Alert
              message="Lỗi đăng ký"
              description={error}
              type="error"
              showIcon
            />
          )}

          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tên đăng nhập"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Nhập email"
              />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="Họ"
              rules={[
                { required: true, message: 'Vui lòng nhập họ!' },
              ]}
            >
              <Input placeholder="Nhập họ" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Tên"
              rules={[
                { required: true, message: 'Vui lòng nhập tên!' },
              ]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Nhập số điện thoại"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
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
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Đã có tài khoản?{' '}
              <Button 
                type="link" 
                style={{ padding: 0 }}
                onClick={onBackToLogin}
              >
                Đăng nhập ngay
              </Button>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default RegisterPage;
