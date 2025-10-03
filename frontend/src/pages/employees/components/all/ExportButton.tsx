import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface ExportButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      size="small"
      onClick={onClick}
      disabled={disabled}
      style={{ background: '#ffffff', borderColor: '#111111', color: '#111111' }}
      icon={<DownloadOutlined style={{ marginRight: 6, color: '#111111' }} />}
    >
      Export
    </Button>
  );
};

export default ExportButton;


