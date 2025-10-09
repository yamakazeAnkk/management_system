import React from 'react';
import { Card, Descriptions, Tag, Button, Space } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const DepartmentDetailPage: React.FC = () => {
  const department = {
    id: '1',
    name: 'Phòng IT',
    description: 'Phòng công nghệ thông tin',
    isActive: true,
    parent: { id: '1', name: 'Công ty ABC' },
    manager: { id: '1', firstName: 'Nguyễn', lastName: 'Văn A' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  return (
    <div>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
        </Space>

        <Card title="Thông tin chi tiết phòng ban">
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Tên phòng ban">{department.name}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{department.description}</Descriptions.Item>
            <Descriptions.Item label="Phòng ban cha">{department.parent?.name || '-'}</Descriptions.Item>
            <Descriptions.Item label="Trưởng phòng">
              {department.manager ? `${department.manager.firstName} ${department.manager.lastName}` : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={department.isActive ? 'green' : 'red'}>
                {department.isActive ? 'Hoạt động' : 'Không hoạt động'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{new Date(department.createdAt).toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label="Cập nhật lần cuối">{new Date(department.updatedAt).toLocaleDateString()}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentDetailPage;
