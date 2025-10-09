import React from 'react';
import { Card, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserForm } from '../../components';

const EditUserPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Update user:', values);
  };

  return (
    <div>
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
    </div>
  );
};

export default EditUserPage;
