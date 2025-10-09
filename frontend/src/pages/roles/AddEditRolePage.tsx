import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Button, 
  Space, 
  Typography, 
  Switch, 
  Row, 
  Col,
  Collapse,
  Checkbox,
  Divider,
  message,
  Spin,
  Popconfirm
} from 'antd';
import { 
  InfoCircleOutlined, 
  SafetyCertificateOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { PERMISSION_CATEGORIES, ROLE_LEVELS, SESSION_TIMEOUT_OPTIONS, getIconComponent } from '../../constants/permissions';
import { RoleFormData, Role, CreateRoleRequest, UpdateRoleRequest } from '../../types/api/role';
import roleService from '../../services/roles/roleService';
import useAuthSimple from '../../hooks/auth/useAuthSimple';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

interface AddEditRolePageProps {
  mode?: 'add' | 'edit';
}

const AddEditRolePage: React.FC<AddEditRolePageProps> = ({ mode: propMode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthSimple();
  
  const [form] = Form.useForm<RoleFormData>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const isEditMode = propMode === 'edit' || (id && propMode !== 'add');
  const pageTitle = isEditMode ? 'Edit Existing Role' : 'Add New Role';

  useEffect(() => {
    if (isEditMode && id) {
      loadRole(id);
    }
  }, [id, isEditMode]);

  const loadRole = async (roleId: string) => {
    try {
      setLoading(true);
      const roleData = await roleService.getRoleById(roleId);
      setRole(roleData);
      
      const formData: RoleFormData = {
        name: roleData.name,
        description: roleData.description || '',
        department: roleData.department || '',
        roleLevel: roleData.roleLevel || '',
        reportsTo: roleData.reportsTo || '',
        permissions: roleData.permissions.map(p => p.id),
        isActive: roleData.isActive,
        requireTwoFactor: roleData.requireTwoFactor || false,
        allowApiAccess: roleData.allowApiAccess || false,
        sessionTimeout: roleData.sessionTimeout || 60
      };
      
      form.setFieldsValue(formData);
      setSelectedPermissions(formData.permissions);
    } catch (error) {
      message.error('Failed to load role data');
      navigate('/roles');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    let newPermissions: string[];
    if (checked) {
      newPermissions = [...selectedPermissions, permissionId];
    } else {
      newPermissions = selectedPermissions.filter(id => id !== permissionId);
    }
    setSelectedPermissions(newPermissions);
    form.setFieldValue('permissions', newPermissions);
  };

  const handleCategorySelectAll = (categoryId: string, checked: boolean) => {
    const category = PERMISSION_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return;

    const categoryPermissionIds = category.permissions.map(p => p.id);
    let newPermissions: string[];

    if (checked) {
      // Add all category permissions
      const permissionsToAdd = categoryPermissionIds.filter(id => !selectedPermissions.includes(id));
      newPermissions = [...selectedPermissions, ...permissionsToAdd];
    } else {
      // Remove all category permissions
      newPermissions = selectedPermissions.filter(id => !categoryPermissionIds.includes(id));
    }

    setSelectedPermissions(newPermissions);
    form.setFieldValue('permissions', newPermissions);
  };

  const isCategoryFullySelected = (categoryId: string): boolean => {
    const category = PERMISSION_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return false;
    
    return category.permissions.every(permission => selectedPermissions.includes(permission.id));
  };

  const isCategoryPartiallySelected = (categoryId: string): boolean => {
    const category = PERMISSION_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return false;
    
    const selectedCount = category.permissions.filter(permission => selectedPermissions.includes(permission.id)).length;
    return selectedCount > 0 && selectedCount < category.permissions.length;
  };

  const handleCopyFromRole = () => {
    // TODO: Implement copy from existing role functionality
    message.info('Copy from existing role functionality will be implemented');
  };

  const handleSave = async (values: RoleFormData) => {
    try {
      setSaving(true);
      
      const requestData = isEditMode 
        ? {
            ...values,
            permissionIds: values.permissions,
          } as UpdateRoleRequest
        : {
            ...values,
            permissionIds: values.permissions,
          } as CreateRoleRequest;

      if (isEditMode && id) {
        await roleService.updateRole(id, requestData);
      } else {
        await roleService.createRole(requestData);
      }

      message.success(isEditMode ? 'Role updated successfully' : 'Role created successfully');
      navigate('/roles');
    } catch (error) {
      console.error('Save role error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setSaving(true);
      await roleService.deleteRole(id);
      message.success('Role deleted successfully');
      navigate('/roles');
    } catch (error) {
      console.error('Delete role error:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleCategoryCollapse = (categoryId: string) => {
    setCollapsedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button 
            type={!isEditMode ? 'primary' : 'default'}
            icon={<PlusOutlined />}
            onClick={() => navigate('/roles/create')}
          >
            Add New Role
          </Button>
          <Button 
            type={isEditMode ? 'primary' : 'default'}
            icon={<EditOutlined />}
            onClick={() => navigate(`/roles/${id}/edit`)}
            disabled={!isEditMode}
          >
            Edit Existing Role
          </Button>
        </div>
        
        <Space>
          <Button onClick={() => navigate('/roles')}>
            Cancel
          </Button>
          {isEditMode && id && (
            <Popconfirm
              title="Delete Role"
              description="Are you sure you want to delete this role? This action cannot be undone."
              onConfirm={handleDelete}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} loading={saving}>
                Delete Role
              </Button>
            </Popconfirm>
          )}
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={saving}
            onClick={() => form.submit()}
          >
            Save Role
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          isActive: true,
          requireTwoFactor: false,
          allowApiAccess: false,
          sessionTimeout: 60,
          permissions: []
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Basic Information */}
          <Col span={24}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <InfoCircleOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '16px' }} />
                <Title level={4} style={{ margin: 0, color: '#1890ff' }}>Basic Information</Title>
              </div>
              <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Define the role name and description
              </Text>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Role Name"
                    rules={[{ required: true, message: 'Please enter role name' }]}
                  >
                    <Input placeholder="e.g., HR Manager, Team Lead" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="department" label="Department">
                    <Select placeholder="Select Department" allowClear>
                      <Select.Option value="hr">Human Resources</Select.Option>
                      <Select.Option value="it">Information Technology</Select.Option>
                      <Select.Option value="finance">Finance</Select.Option>
                      <Select.Option value="marketing">Marketing</Select.Option>
                      <Select.Option value="operations">Operations</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="description" label="Description">
                <TextArea 
                  rows={3} 
                  placeholder="Describe the responsibilities and purpose of this role..."
                  style={{ resize: 'vertical' }}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="roleLevel" label="Role Level">
                    <Select placeholder="Select Level" allowClear>
                      {ROLE_LEVELS.map(level => (
                        <Select.Option key={level.value} value={level.value}>
                          {level.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="reportsTo" label="Reports To">
                    <Select placeholder="Select Role" allowClear>
                      <Select.Option value="ceo">CEO</Select.Option>
                      <Select.Option value="cto">CTO</Select.Option>
                      <Select.Option value="hr-director">HR Director</Select.Option>
                      <Select.Option value="manager">Manager</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Permissions & Access */}
          <Col span={24}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SafetyCertificateOutlined style={{ color: '#722ed1', marginRight: '8px', fontSize: '16px' }} />
                  <Title level={4} style={{ margin: 0, color: '#722ed1' }}>Permissions & Access</Title>
                </div>
                <Button 
                  type="link" 
                  icon={<CopyOutlined />}
                  onClick={handleCopyFromRole}
                  style={{ padding: 0 }}
                >
                  Copy from existing role
                </Button>
              </div>
              <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Configure what this role can access and manage
              </Text>

              <Collapse 
                activeKey={collapsedCategories}
                onChange={(keys) => setCollapsedCategories(keys as string[])}
                ghost
              >
                {PERMISSION_CATEGORIES.map(category => {
                  const IconComponent = getIconComponent(category.icon);
                  const isFullySelected = isCategoryFullySelected(category.id);
                  const isPartiallySelected = isCategoryPartiallySelected(category.id);
                  
                  return (
                    <Panel
                      key={category.id}
                      header={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconComponent style={{ color: category.color, marginRight: '8px' }} />
                            <span style={{ fontWeight: 500 }}>{category.name}</span>
                            <Text type="secondary" style={{ marginLeft: '8px' }}>
                              {category.permissions.length} permissions
                            </Text>
                          </div>
                          <Checkbox
                            checked={isFullySelected}
                            indeterminate={isPartiallySelected}
                            onChange={(e) => handleCategorySelectAll(category.id, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Select All
                          </Checkbox>
                        </div>
                      }
                    >
                      <div style={{ paddingLeft: '32px' }}>
                        {category.permissions.map(permission => (
                          <div key={permission.id} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '8px 0',
                            borderBottom: '1px solid #f5f5f5'
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                                {permission.name}
                              </div>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                {permission.description}
                              </Text>
                            </div>
                            <Switch
                              checked={selectedPermissions.includes(permission.id)}
                              onChange={(checked) => handlePermissionChange(permission.id, checked)}
                              size="small"
                            />
                          </div>
                        ))}
                      </div>
                    </Panel>
                  );
                })}
              </Collapse>
            </Card>
          </Col>

          {/* Additional Settings */}
          <Col span={24}>
            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>Additional Settings</Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Configure additional role settings and security options
              </Text>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="isActive" label="Active Status" valuePropName="checked">
                    <Switch 
                      checkedChildren="Active" 
                      unCheckedChildren="Inactive"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="requireTwoFactor" label="Require Two-Factor Authentication" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="allowApiAccess" label="Allow API Access" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="sessionTimeout" label="Session Timeout">
                <Select placeholder="Select timeout duration">
                  {SESSION_TIMEOUT_OPTIONS.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddEditRolePage;
