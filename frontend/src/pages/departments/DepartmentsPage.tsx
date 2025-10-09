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
  Tree,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  BankOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Department } from '../../types';

const { Search } = Input;

const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'tree'>('table');

  // Mock data
  const mockDepartments: Department[] = [
    {
      id: '1',
      name: 'Công ty ABC',
      description: 'Công ty chính',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      children: [
        {
          id: '2',
          name: 'Phòng IT',
          description: 'Phòng công nghệ thông tin',
          parentId: '1',
          isActive: true,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
        },
        {
          id: '3',
          name: 'Phòng Nhân sự',
          description: 'Phòng quản lý nhân sự',
          parentId: '1',
          isActive: true,
          createdAt: '2024-01-03T00:00:00Z',
          updatedAt: '2024-01-03T00:00:00Z',
        },
      ],
    },
  ];

  const columns = [
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Department, b: Department) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Phòng ban cha',
      key: 'parent',
      render: (_: any, record: Department) => record.parent?.name || '-',
    },
    {
      title: 'Trưởng phòng',
      key: 'manager',
      render: (_: any, record: Department) => 
        record.manager ? `${record.manager.firstName} ${record.manager.lastName}` : '-',
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
      onFilter: (value: boolean, record: Department) => record.isActive === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Department) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa phòng ban"
            description="Bạn có chắc chắn muốn xóa phòng ban này?"
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
    setEditingDepartment(null);
    setModalVisible(true);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    message.success('Xóa phòng ban thành công');
    // TODO: Implement delete logic
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingDepartment(null);
  };

  const handleSubmit = (values: any) => {
    message.success(editingDepartment ? 'Cập nhật phòng ban thành công' : 'Tạo phòng ban thành công');
    handleModalClose();
    // TODO: Implement submit logic
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const filteredDepartments = mockDepartments.filter(dept => {
    const matchesSearch = !searchText || 
      dept.name.toLowerCase().includes(searchText.toLowerCase()) ||
      dept.description?.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesSearch;
  });

  // Convert departments to tree data
  const treeData = mockDepartments.map(dept => ({
    title: (
      <Space>
        <span>{dept.name}</span>
        <Tag color={dept.isActive ? 'green' : 'red'}>
          {dept.isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      </Space>
    ),
    key: dept.id,
    children: dept.children?.map(child => ({
      title: (
        <Space>
          <span>{child.name}</span>
          <Tag color={child.isActive ? 'green' : 'red'}>
            {child.isActive ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        </Space>
      ),
      key: child.id,
    })),
  }));

  return (
    <div>
      <div>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Tổng phòng ban"
                value={mockDepartments.length}
                prefix={<BankOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Phòng ban hoạt động"
                value={mockDepartments.filter(d => d.isActive).length}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Phòng ban không hoạt động"
                value={mockDepartments.filter(d => !d.isActive).length}
                prefix={<BankOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          title="Danh sách phòng ban"
          extra={
            <Space>
              <Button
                type={viewMode === 'table' ? 'primary' : 'default'}
                onClick={() => setViewMode('table')}
              >
                Bảng
              </Button>
              <Button
                type={viewMode === 'tree' ? 'primary' : 'default'}
                onClick={() => setViewMode('tree')}
              >
                Cây
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Thêm phòng ban
              </Button>
              {selectedRowKeys.length > 0 && (
                <Popconfirm
                  title="Xóa nhiều phòng ban"
                  description={`Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} phòng ban?`}
                  onConfirm={() => {
                    message.success(`Đã xóa ${selectedRowKeys.length} phòng ban`);
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
                placeholder="Tìm kiếm phòng ban..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={setSearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
          </Row>

          {viewMode === 'table' ? (
            <Table
              columns={columns}
              dataSource={filteredDepartments}
              rowKey="id"
              loading={loading}
              rowSelection={rowSelection}
              pagination={{
                total: filteredDepartments.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
              }}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Tree
              treeData={treeData}
              defaultExpandAll
              showLine
              showIcon={false}
            />
          )}
        </Card>

        <Modal
          title={editingDepartment ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban mới'}
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
        >
          {/* TODO: Add DepartmentForm component */}
          <div style={{ padding: '20px 0' }}>
            Form sẽ được thêm vào đây
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DepartmentsPage;
