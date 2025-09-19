import React from 'react';
import { Card, Form, Input, Button, Switch, Select, Space } from 'antd';
import { Layout } from '../../components';

const { Option } = Select;

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Update settings:', values);
  };

  return (
    <Layout>
      <div>
        <Card title="Cài đặt">
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
    </Layout>
  );
};

export default SettingsPage;
