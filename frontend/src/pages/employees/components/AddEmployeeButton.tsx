import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AddEmployeeButtonProps {
  onClick?: () => void;
}

const AddEmployeeButton: React.FC<AddEmployeeButtonProps> = ({ onClick }) => {
  return (
    <Button
      size="small"
      onClick={onClick}
      style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
      icon={<PlusOutlined style={{ marginRight: 6, color: '#ffffff' }} />}
    >
      Add Employee
    </Button>
  );
};

export default AddEmployeeButton;


