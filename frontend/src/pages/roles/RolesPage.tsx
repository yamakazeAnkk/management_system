import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Tag,
  Modal,
  message,
  Popconfirm,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SafetyOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout } from '../../components';
import { Role } from '../../types';

const { Search } = Input;

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Mock data
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Admin',
      description: 'Quản trị viên hệ thống',
      isActive: true,
      permissions: [
        { id: '1', name: 'Quản lý người dùng', resource: 'users', action: 'manage' },
        { id: '2', name: 'Quản lý vai trò', resource: 'roles', action: 'manage' },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'User',
      description: 'Người dùng thông thường',
      isActive: true,
      permissions: [
        { id: '3', name: 'Xem thông tin', resource: 'profile', action: 'read' },
      ],
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
  ];

  const columns = [
    {
      title: 'Tên vai trò',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Role, b: Role) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quyền hạn',
      key: 'permissions',
      dataIndex: 'permissions',
      render: (permissions: any[]) => (
        <Space wrap>
          {permissions.slice(0, 3).map((permission) => (
            <Tag key={permission.id} color="blue">
              {permission.name}
            </Tag>
          ))}
          {permissions.length > 3 && (
            <Tag color="default">+{permissions.length - 3} khác</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Không hoạt động', value: false },
      ],
      onFilter: (value: boolean, record: Role) => record.isActive === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Role) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa vai trò"
            description="Bạn có chắc chắn muốn xóa vai trò này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCreate = () => {
    setEditingRole(null);
    setModalVisible(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    message.success('Xóa vai trò thành công');
    // TODO: Implement delete logic
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingRole(null);
  };

  const handleSubmit = (values: any) => {
    message.success(editingRole ? 'Cập nhật vai trò thành công' : 'Tạo vai trò thành công');
    handleModalClose();
    // TODO: Implement submit logic
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const filteredRoles = mockRoles.filter(role => {
    const matchesSearch = !searchText || 
      role.name.toLowerCase().includes(searchText.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <Layout>
      <div>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Tổng vai trò"
                value={mockRoles.length}
                prefix={<SafetyOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Vai trò hoạt động"
                value={mockRoles.filter(r => r.isActive).length}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Vai trò không hoạt động"
                value={mockRoles.filter(r => !r.isActive).length}
                prefix={<SafetyOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          title="Danh sách vai trò"
          extra={
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Thêm vai trò
              </Button>
              {selectedRowKeys.length > 0 && (
                <Popconfirm
                  title="Xóa nhiều vai trò"
                  description={`Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} vai trò?`}
                  onConfirm={() => {
                    message.success(`Đã xóa ${selectedRowKeys.length} vai trò`);
                    setSelectedRowKeys([]);
                  }}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Xóa ({selectedRowKeys.length})
                  </Button>
                </Popconfirm>
              )}
            </Space>
          }
        >
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Search
                placeholder="Tìm kiếm vai trò..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={setSearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={filteredRoles}
            rowKey="id"
            loading={loading}
            rowSelection={rowSelection}
            pagination={{
              total: filteredRoles.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
            }}
            scroll={{ x: 'max-content' }}
          />
        </Card>

        <Modal
          title={editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
        >
          {/* TODO: Add RoleForm component */}
          <div style={{ padding: '20px 0' }}>
            Form sẽ được thêm vào đây
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default RolesPage;
