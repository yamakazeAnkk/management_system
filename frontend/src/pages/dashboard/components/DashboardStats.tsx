import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';

export interface StatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string; // hex or css color value
  subtitle?: string;
}

interface DashboardStatsProps {
  statistics: StatItem[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ statistics }) => {
  return (
    <Row gutter={[16, 16]} align="stretch" style={{ marginBottom: 24 }}>
      {statistics.map((stat, index) => (
        <Col key={index} xs={24} sm={12} md={12} lg={6}>
          <Card style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <Statistic
                  valueStyle={{ color: stat.color }}
                  title={stat.title}
                  value={stat.value}
                />
                {stat.subtitle && (
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.45)' }}>
                    {stat.subtitle}
                  </Typography.Text>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
                {stat.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;


