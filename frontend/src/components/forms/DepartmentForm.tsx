import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Button, TreeSelect } from 'antd';
import { Department, CreateDepartmentRequest, UpdateDepartmentRequest, User } from '../../types';

const { Option } = Select;
const { TextArea } = Input;

interface DepartmentFormProps {
  initialValues?: Department;
  onSubmit: (values: CreateDepartmentRequest | UpdateDepartmentRequest) => void;
  loading?: boolean;
  departments?: Department[];
  users?: User[];
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
  departments = [],
  users = [],
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        parentId: initialValues.parentId,
        managerId: initialValues.managerId,
      });
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  // Convert departments to tree data
  const departmentTreeData = departments.map(dept => ({
    title: dept.name,
    value: dept.id,
    key: dept.id,
    children: dept.children?.map(child => ({
      title: child.name,
      value: child.id,
      key: child.id,
    })),
  }));

  return (
    <Form
      form={form}
      name="departmentForm"
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      initialValues={{
        isActive: true,
      }}
    >
      <Form.Item
        name="name"
        label="Tên phòng ban"
        rules={[
          { required: true, message: 'Vui lòng nhập tên phòng ban!' },
          { min: 2, message: 'Tên phòng ban phải có ít nhất 2 ký tự!' },
        ]}
      >
        <Input placeholder="Nhập tên phòng ban" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
      >
        <TextArea
          rows={3}
          placeholder="Nhập mô tả phòng ban"
          maxLength={500}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="parentId"
        label="Phòng ban cha"
      >
        <TreeSelect
          treeData={departmentTreeData}
          placeholder="Chọn phòng ban cha"
          allowClear
          style={{ width: '100%' }}
          treeDefaultExpandAll
        />
      </Form.Item>

      <Form.Item
        name="managerId"
        label="Trưởng phòng"
      >
        <Select placeholder="Chọn trưởng phòng" allowClear>
          {users.map(user => (
            <Option key={user.id} value={user.id}>
              {user.firstName} {user.lastName} ({user.username})
            </Option>
          ))}
        </Select>
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

export default DepartmentForm;
