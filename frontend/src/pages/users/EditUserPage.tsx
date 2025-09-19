import React from 'react';
import { Card, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout } from '../../components';
import { UserForm } from '../../components';

const EditUserPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Update user:', values);
  };

  return (
    <Layout>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </Space>

        <Card title="Chỉnh sửa người dùng">
          <UserForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </Layout>
  );
};

export default EditUserPage;
