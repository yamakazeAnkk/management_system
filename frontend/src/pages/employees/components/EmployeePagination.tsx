import React from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface EmployeePaginationProps {
  total: number;
  current: number;
}

const EmployeePagination: React.FC<EmployeePaginationProps> = ({ total, current }) => {
  return (
    <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <p style={{ margin: 0, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Showing 1 to 10 of {total} results</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button size="small" icon={<LeftOutlined />} />
        <Button type="primary" size="small" style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}>{current}</Button>
        <Button size="small">2</Button>
        <Button size="small">3</Button>
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>...</span>
        <Button size="small">25</Button>
        <Button size="small" icon={<RightOutlined />} />
      </div>
    </div>
  );
};

export default EmployeePagination;


