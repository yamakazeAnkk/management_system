import React from 'react';
import { Avatar, Button, Card, Col, Tag, Typography } from 'antd';
import { departments } from '../Data';

const DepartmentOverview: React.FC = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={12}>
      <Card title="Department Overview" extra={<Button type="text" size="small">Manage</Button>} style={{ height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {departments.slice(0, 3).map((dept) => (
            <Tag key={dept.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, margin: 0 }}>
              <Avatar style={{ backgroundColor: dept.color, color: '#fff' }} size={32}>
                <span style={{ fontSize: 12 }}>{dept.avatar}</span>
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>{dept.name}</Typography.Text>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{dept.employees} employees</div>
              </div>
              <div color="default" style={{ fontSize: 12, padding: '2px 8px', margin: 0 }}>{dept.percentage}%</div>
            </Tag>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default DepartmentOverview;


