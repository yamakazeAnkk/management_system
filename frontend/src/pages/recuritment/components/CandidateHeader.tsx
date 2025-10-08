import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CandidateHeaderProps {
  onAddCandidate: () => void;
  onExport: () => void;
}

const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  onAddCandidate,
  onExport,
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
          Candidate Management
        </Title>
        <Text
          style={{
            color: '#6B7280',
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          Manage and track candidates through the recruitment process
        </Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button
          icon={<PlusOutlined />}
          onClick={onAddCandidate}
          style={{ background: '#000000', borderColor: '#000000', color: '#ffffff' }}
        >
          Add Candidate
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

export default CandidateHeader;
