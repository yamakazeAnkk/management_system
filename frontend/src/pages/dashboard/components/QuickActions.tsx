import React from 'react';
import { Card, Col, Button, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { quickActions } from '../Data';

const QuickActions: React.FC = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={7}>
      <Card title="Quick Actions" style={{ height: '100%' }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          {quickActions.map((action) => (
            <Button
              key={action.title}
              block
              size="large"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                padding: '12px 16px',
                height: 48,
                fontSize: 15,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 4 }}>
                {action.icon}
                {action.title}
              </span>
              <RightOutlined style={{ fontSize: 16 }} />
            </Button>
          ))}
        </Space>
      </Card>
    </Col>
  );
};

export default QuickActions;


