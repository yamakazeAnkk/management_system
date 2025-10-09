import React from 'react';
import { Card, Form, Button, Switch, Select, Space, Typography } from 'antd';
import { SafetyCertificateOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;
const { Title, Text } = Typography;

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values: { theme: string; language: string; notifications: boolean }) => {
    console.log('Update settings:', values);
  };

  return (
    <div>
      {/* Role Management Card */}
      <Card 
        style={{ marginBottom: '24px' }}
        hoverable
        onClick={() => navigate('/roles')}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
            <div>
              <Title level={4} style={{ margin: 0, marginBottom: '4px' }}>Quản lý vai trò & quyền</Title>
              <Text type="secondary">Tạo và quản lý vai trò, phân quyền cho người dùng</Text>
            </div>
          </div>
          <ArrowRightOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
        </div>
      </Card>

      {/* User Settings Card */}
      <Card title="Cài đặt cá nhân">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            theme: 'light',
            language: 'vi',
            notifications: true,
          }}
        >
          <Form.Item
            name="theme"
            label="Giao diện"
          >
            <Select>
              <Option value="light">Sáng</Option>
              <Option value="dark">Tối</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="language"
            label="Ngôn ngữ"
          >
            <Select>
              <Option value="vi">Tiếng Việt</Option>
              <Option value="en">English</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notifications"
            label="Thông báo"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Lưu cài đặt
              </Button>
              <Button>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsPage;
