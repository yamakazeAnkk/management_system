import React from 'react';
import { Form, Input, Button, Space, Switch, Select } from 'antd';
import type { Role } from '../data/role';

type RolesFormValues = Partial<Role> & {
  name: string;
  department?: string;
  description?: string;
  isActive?: boolean;
};

interface RolesFormProps {
  initialValues?: RolesFormValues;
  onSubmit: (values: RolesFormValues) => void;
  onCancel: () => void;
}

const departmentOptions = [
  'IT',
  'Human Resources',
  'Engineering',
  'Finance',
  'All',
  'External',
].map((d) => ({ label: d, value: d }));

const RolesForm: React.FC<RolesFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm<RolesFormValues>();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ isActive: true, ...initialValues }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Role name"
        name="name"
        rules={[{ required: true, message: 'Please enter role name' }]}
      >
        <Input placeholder="e.g. HR Manager" />
      </Form.Item>

      <Form.Item label="Department" name="department">
        <Select
          options={departmentOptions}
          allowClear
          placeholder="Select department"
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} placeholder="Short description of this role" />
      </Form.Item>

      <Form.Item label="Active" name="isActive" valuePropName="checked">
        <Switch 
          checkedChildren="On" 
          unCheckedChildren="Off"
          style={{ backgroundColor: form.getFieldValue('isActive') ? '#000000' : '#808080' }}
        />
      </Form.Item>

      <Space style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ background: '#000000', borderColor: '#000000' }}
        >
          Save
        </Button>
      </Space>
    </Form>
  );
};

export default RolesForm;


