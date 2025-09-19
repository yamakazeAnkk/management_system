import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { MESSAGES } from '../../constants';

const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual forgot password logic
      console.log('Forgot password attempt:', values);
      setSuccess(true);
    } catch (err) {
      setError('Gửi email khôi phục thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <Card
          style={{
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
              Email đã được gửi
            </Title>
            <Text type="secondary">
              Vui lòng kiểm tra email và làm theo hướng dẫn để đặt lại mật khẩu.
            </Text>
            <Button type="primary" block>
              Về trang đăng nhập
            </Button>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              Quên mật khẩu
            </Title>
            <Text type="secondary">
              Nhập email để nhận liên kết đặt lại mật khẩu
            </Text>
          </div>

          {error && (
            <Alert
              message="Lỗi"
              description={error}
              type="error"
              showIcon
            />
          )}

          <Form
            form={form}
            name="forgotPassword"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                size="large"
              >
                {isLoading ? MESSAGES.INFO.LOADING : 'Gửi email khôi phục'}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Nhớ mật khẩu?{' '}
              <Button type="link" style={{ padding: 0 }}>
                Đăng nhập ngay
              </Button>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
