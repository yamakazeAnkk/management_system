import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AddEmployeeButtonProps {
  onClick?: () => void;
  to?: string;
}

const AddEmployeeButton: React.FC<AddEmployeeButtonProps> = ({ onClick, to = '/employees/add' }) => {
  const handleClick = () => {
    if (onClick) return onClick()
    window.location.assign(to)
  }
  return (
    <Button
      size="small"
      onClick={handleClick}
      style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
      icon={<PlusOutlined style={{ marginRight: 6, color: '#ffffff' }} />}
    >
      Add Employee 
    </Button>
  );
};

export default AddEmployeeButton;


