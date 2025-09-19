import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Button, Row, Col, Upload, Avatar } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import type { User, CreateUserRequest, UpdateUserRequest } from '../../types';

const { Option } = Select;

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: CreateUserRequest | UpdateUserRequest) => void;
  loading?: boolean;
  departments?: Array<{ id: string; name: string }>;
  roles?: Array<{ id: string; name: string }>;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
  departments = [],
  roles = [],
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        roleIds: initialValues.roles?.map(role => role.id),
      });
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      form.setFieldValue('avatar', info.file.response?.url);
    }
  };

  return (
    <Form
      form={form}
      name="userForm"
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      initialValues={{
        isActive: true,
      }}
    >
      <Row gutter={16}>
        <Col span={24} style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            src={form.getFieldValue('avatar')}
            style={{ marginBottom: 16 }}
          />
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            onChange={handleAvatarChange}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} size="small">
              Tải ảnh đại diện
            </Button>
          </Upload>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="Họ"
            rules={[
              { required: true, message: 'Vui lòng nhập họ!' },
            ]}
          >
            <Input placeholder="Nhập họ" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Tên"
            rules={[
              { required: true, message: 'Vui lòng nhập tên!' },
            ]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { pattern: /^[\+]?[1-9][\d]{0,15}$/, message: 'Số điện thoại không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="departmentId"
            label="Phòng ban"
          >
            <Select placeholder="Chọn phòng ban" allowClear>
              {departments.map(dept => (
                <Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="roleIds"
        label="Vai trò"
        rules={[
          { required: true, message: 'Vui lòng chọn ít nhất một vai trò!' },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Chọn vai trò"
          style={{ width: '100%' }}
        >
          {roles.map(role => (
            <Option key={role.id} value={role.id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {!initialValues && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>
          <Col span={12}>
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
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item
        name="isActive"
        label="Trạng thái"
        valuePropName="checked"
      >
        <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
        >
          {loading ? 'Đang lưu...' : initialValues ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
