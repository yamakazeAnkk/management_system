import React from 'react';
import { Card, Col, List } from 'antd';
import { recentActivities } from '../Data';

const   RecentActivities: React.FC = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={12}>
      <Card
        title="Recent Activities"
        extra={
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'black',
              cursor: 'pointer',
              padding: 0,
              font: 'inherit',
              textDecoration: 'underline'
            }}
          >
            View all
          </button>
        }
        style={{ height: '100%' }}
      >
        <List
          size="small"
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%' }}>
                <div style={{ width: 8, height: 8, background: '#000000', borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{item.time}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </Col>
  );
};

export default RecentActivities;


