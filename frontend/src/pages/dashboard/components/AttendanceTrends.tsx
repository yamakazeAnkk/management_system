import React from 'react';
import { Card, Col, Space, Button } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const AttendanceTrends: React.FC = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={17}>
      <Card title="Attendance Trends" style={{ height: '100%' }} extra={
        <Space>
          <Button size="small">7D</Button>
          <Button type="primary" size="small">30D</Button>
          <Button size="small">90D</Button>
        </Space>
      }>
        <div style={{ height: 256, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #d9d9d9', borderRadius: 8 }}>
          <div style={{ textAlign: 'center' }}>
            <LineChartOutlined style={{ fontSize: 48, color: 'rgba(0,0,0,0.45)', marginBottom: 8 }} />
            <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.45)' }}>Attendance Chart Placeholder</div>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Chart showing daily attendance trends</div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default AttendanceTrends;


