import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: 'var(--color-surface-muted)' }}>
      <Text type="secondary">
        Management System ©2024 Created by Development Team
      </Text>
    </AntFooter>
  );
};

export default Footer;
