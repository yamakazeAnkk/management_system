import React from 'react';
import { Card, Col, Row } from 'antd';
import { statistics } from '../../Data';

const EmployeesStatsCards: React.FC = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }} align="stretch">
      {statistics.map((stat, idx) => (
        <Col key={idx} xs={24} sm={12} md={12} lg={6}>
          <Card 
            style={{
              height: 120,
              borderRadius: 8,
              border: '1px solid #f0f0f0',
              boxShadow: '0 10px 16px -12px rgba(0,0,0,0.5)'
            }}
            bodyStyle={{ padding: 10, height: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, color: 'rgba(0,0,0,0.45)' }}>{stat.title}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>{stat.value}</div>
                </div>
                <div
                  style={{
                    height: 48,
                    width: 48,
                    borderRadius: '50%',
                    background: stat.bg || 'rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: stat.textColor || stat.color,
                    marginLeft: 12,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default EmployeesStatsCards;


