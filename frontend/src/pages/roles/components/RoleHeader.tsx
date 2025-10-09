import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface RoleHeaderProps {
  onCreateRole: () => void;
  onDuplicateRole: () => void;
  onExport: () => void;
  selectedCount?: number;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({
  onCreateRole,
  onDuplicateRole,
  onExport,
  selectedCount = 0,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Title
          level={1}
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.2,
          }}
        >
          Role Management
        </Title>
        <Text
          style={{
            color: '#6B7280',
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          Create and manage user roles and permissions
        </Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button
          icon={<PlusOutlined />}
          onClick={onCreateRole}
          style={{ background: '#000000', borderColor: '#000000', color: '#ffffff' }}
        >
          Create Role
        </Button>
        <Button
          icon={<CopyOutlined />}
          onClick={onDuplicateRole}
          disabled={selectedCount === 0}
          style={{ 
            background: selectedCount > 0 ? '#52c41a' : undefined, 
            borderColor: selectedCount > 0 ? '#52c41a' : undefined, 
            color: selectedCount > 0 ? '#ffffff' : undefined 
          }}
        >
          Duplicate Role {selectedCount > 0 && `(${selectedCount})`}
        </Button>
        <Button
          icon={<DownloadOutlined />}
          onClick={onExport}
        >
          Export Excel
        </Button>
      </div>
    </div>
  );
};

export default RoleHeader;
