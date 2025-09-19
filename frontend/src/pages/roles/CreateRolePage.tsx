import React from 'react';
import { Card, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout } from '../../components';
import { RoleForm } from '../../components';

const CreateRolePage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Create role:', values);
  };

  return (
    <Layout>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </Space>

        <Card title="Tạo vai trò mới">
          <RoleForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </Layout>
  );
};

export default CreateRolePage;
