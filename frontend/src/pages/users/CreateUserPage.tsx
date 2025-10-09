import React from 'react';
import { Card, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserForm } from '../../components';

const CreateUserPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Create user:', values);
  };

  return (
    <div>
      <div>
        <Space style={{ marginBottom: 24 }}>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>
        </Space>

        <Card title="Tạo người dùng mới">
          <UserForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  );
};

export default CreateUserPage;
