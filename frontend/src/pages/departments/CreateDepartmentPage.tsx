import React from 'react';
import { Card, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DepartmentForm } from '../../components';

const CreateDepartmentPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Create department:', values);
  };

  return (
    <div>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </Space>

        <Card title="Tạo phòng ban mới">
          <DepartmentForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  );
};

export default CreateDepartmentPage;
