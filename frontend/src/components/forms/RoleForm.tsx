import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Button, TreeSelect } from 'antd';
import { Role, CreateRoleRequest, UpdateRoleRequest, Permission } from '../../types';

const { Option } = Select;
const { TextArea } = Input;

interface RoleFormProps {
  initialValues?: Role;
  onSubmit: (values: CreateRoleRequest | UpdateRoleRequest) => void;
  loading?: boolean;
  permissions?: Permission[];
}

const RoleForm: React.FC<RoleFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
  permissions = [],
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        permissionIds: initialValues.permissions?.map(permission => permission.id),
      });
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  // Group permissions by resource
  const permissionTreeData = permissions.reduce((acc, permission) => {
    const resource = permission.resource;
    if (!acc[resource]) {
      acc[resource] = {
        title: resource,
        value: resource,
        key: resource,
        children: [],
      };
    }
    acc[resource].children.push({
      title: `${permission.action} - ${permission.name}`,
      value: permission.id,
      key: permission.id,
    });
    return acc;
  }, {} as Record<string, any>);

  const treeData = Object.values(permissionTreeData);

  return (
    <Form
      form={form}
      name="roleForm"
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      initialValues={{
        isActive: true,
      }}
    >
      <Form.Item
        name="name"
        label="Tên vai trò"
        rules={[
          { required: true, message: 'Vui lòng nhập tên vai trò!' },
          { min: 2, message: 'Tên vai trò phải có ít nhất 2 ký tự!' },
        ]}
      >
        <Input placeholder="Nhập tên vai trò" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
      >
        <TextArea
          rows={3}
          placeholder="Nhập mô tả vai trò"
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="permissionIds"
        label="Quyền hạn"
        rules={[
          { required: true, message: 'Vui lòng chọn ít nhất một quyền hạn!' },
        ]}
      >
        <TreeSelect
          treeData={treeData}
          placeholder="Chọn quyền hạn"
          multiple
          treeCheckable
          showCheckedStrategy={TreeSelect.SHOW_CHILD}
          style={{ width: '100%' }}
        />
      </Form.Item>

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

export default RoleForm;
