import React from 'react';
import { Card, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout } from '../../components';
import { DepartmentForm } from '../../components';

const EditDepartmentPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Update department:', values);
  };

  return (
    <Layout>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </Space>

        <Card title="Chỉnh sửa phòng ban">
          <DepartmentForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </Layout>
  );
};

export default EditDepartmentPage;
