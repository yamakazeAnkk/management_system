# Ant Design Integration Guide

## 🎯 Tổng quan

Dự án đã được tích hợp với **Ant Design** - một thư viện UI component mạnh mẽ và chuyên nghiệp cho React.

## 📦 Dependencies đã cài đặt

```bash
npm install antd @ant-design/icons
```

## 🚀 Cách sử dụng

### 1. Import Components

```typescript
import { Button, Input, Table, Card, Modal } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
```

### 2. Sử dụng trong Components

```typescript
import React from 'react';
import { Button, Input, Form, Card } from 'antd';

const MyComponent = () => {
  return (
    <Card title="Tiêu đề">
      <Form>
        <Form.Item label="Tên người dùng">
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Lưu</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
```

## 🎨 Custom Components đã tạo

### Button Component
```typescript
import { Button } from '@/components';

<Button 
  variant="primary" 
  size="large" 
  loading={isLoading}
  onClick={handleClick}
>
  Click me
</Button>
```

### Input Component
```typescript
import { Input } from '@/components';

<Input 
  label="Tên người dùng"
  placeholder="Nhập tên người dùng"
  error={error}
/>
```

### Table Component
```typescript
import { Table } from '@/components';

<Table
  columns={columns}
  dataSource={data}
  loading={loading}
  pagination={{
    current: page,
    pageSize: limit,
    total: total,
  }}
/>
```

### Modal Component
```typescript
import { Modal } from '@/components';

<Modal
  title="Xác nhận"
  visible={visible}
  onCancel={handleCancel}
  onOk={handleOk}
  confirmLoading={loading}
>
  <p>Bạn có chắc chắn muốn xóa?</p>
</Modal>
```

## 🏗️ Layout System

### Main Layout
```typescript
import { Layout } from '@/components';

<Layout>
  <YourPageContent />
</Layout>
```

Layout bao gồm:
- **Header**: Thanh điều hướng với user menu
- **Sider**: Menu sidebar có thể thu gọn
- **Content**: Nội dung chính của trang

## 🎯 Pages đã tích hợp

### Login Page
- Form đăng nhập với validation
- Design hiện đại với gradient background
- Responsive design

### Dashboard Page
- Statistics cards
- Data table với pagination
- Action buttons

## 🌍 Internationalization

Ant Design đã được cấu hình với locale tiếng Việt:

```typescript
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

<ConfigProvider locale={viVN}>
  <App />
</ConfigProvider>
```

## 🎨 Theme Customization

Theme đã được tùy chỉnh:

```typescript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }}
>
  <App />
</ConfigProvider>
```

## 📱 Responsive Design

Ant Design tự động responsive, nhưng bạn có thể sử dụng:

```typescript
import { Row, Col } from 'antd';

<Row gutter={16}>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Card>Content 1</Card>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Card>Content 2</Card>
  </Col>
</Row>
```

## 🔧 Form Handling

Sử dụng Ant Design Form với validation:

```typescript
import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="Tên người dùng"
        rules={[
          { required: true, message: 'Vui lòng nhập tên người dùng!' },
          { min: 3, message: 'Tên người dùng phải có ít nhất 3 ký tự!' }
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## 📊 Data Display

### Table với Actions
```typescript
const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />}>
          Sửa
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />}>
          Xóa
        </Button>
      </Space>
    ),
  },
];
```

### Statistics Cards
```typescript
import { Statistic, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

<Card>
  <Statistic
    title="Tổng người dùng"
    value={1234}
    prefix={<UserOutlined />}
    valueStyle={{ color: '#1890ff' }}
  />
</Card>
```

## 🎭 Icons

Sử dụng icons từ @ant-design/icons:

```typescript
import {
  UserOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

<Button icon={<PlusOutlined />}>Thêm mới</Button>
```

## 🚀 Best Practices

1. **Consistent Design**: Sử dụng các component đã được wrap để đảm bảo consistency
2. **Form Validation**: Luôn sử dụng Ant Design Form với validation rules
3. **Loading States**: Sử dụng loading props cho buttons và tables
4. **Responsive**: Sử dụng Row/Col cho layout responsive
5. **Accessibility**: Ant Design đã built-in accessibility features
6. **Performance**: Sử dụng Table với pagination cho large datasets

## 📚 Tài liệu tham khảo

- [Ant Design Official Docs](https://ant.design/)
- [Ant Design Components](https://ant.design/components/overview/)
- [Ant Design Icons](https://ant.design/components/icon/)
- [Ant Design Theme](https://ant.design/docs/react/customize-theme)

## 🔄 Migration từ Custom Components

Nếu bạn đã có custom components, có thể migrate dần dần:

1. Thay thế custom Button bằng Ant Design Button
2. Sử dụng Ant Design Form thay vì custom form handling
3. Migrate tables sang Ant Design Table
4. Sử dụng Ant Design Layout system

Ant Design sẽ giúp bạn có một UI/UX chuyên nghiệp và nhất quán!
