import React from 'react';
import { Avatar, Card, Col } from 'antd';
import { topPerformers } from '../Data';

const TopPerformers: React.FC = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={8}>
      <Card title="Top Performers" style={{ height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topPerformers.map((performer, index) => (
            <div key={performer.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: index === 0 ? '#faad14' : index === 1 ? '#bfbfbf' : '#fa8c16' }}>#{index + 1}</span>
                <Avatar size={32} style={{ backgroundColor: '#1677ff', color: '#fff' }}>{performer.avatar}</Avatar>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{performer.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{performer.department}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{performer.score}%</div>
                <div style={{ fontSize: 12, color: '#52c41a' }}>{performer.improvement}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default TopPerformers;


