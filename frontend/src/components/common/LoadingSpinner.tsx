import React from 'react';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'default',
  tip = 'Đang tải...',
  spinning = true,
  children,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 24 : size === 'small' ? 14 : 20 }} spin />;

  if (children) {
    return (
      <Spin spinning={spinning} indicator={antIcon} tip={tip}>
        {children}
      </Spin>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
      <Spin size={size} indicator={antIcon} tip={tip} />
    </Space>
  );
};

export default LoadingSpinner;
