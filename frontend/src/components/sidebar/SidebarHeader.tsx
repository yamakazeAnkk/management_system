import React from 'react';
import { Typography } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


interface SidebarHeaderProps {
  isCollapsed: boolean
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  const navigate = useNavigate();
  return (
    <div
    
      style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        padding: isCollapsed ? '0' : '0 16px',
        //borderBottom: '1px solid var(--color-sidebar-border)',
        borderBottom: '1px solid #4a637a'
      }}
    >
      <div
        style={{ padding: 16 ,display: 'flex', alignItems: 'center', gap: isCollapsed ? 0 : 12, cursor: 'pointer' }}
        onClick={() => navigate('/employees')}
      >
        <div style={{ height: 32, width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: 'var(--color-sidebar-brand)', color: '#fff' }}>
          <BankOutlined />
        </div>
        {!isCollapsed && (
          <div>
            <Typography.Title level={4} style={{ margin: 0, color: 'var(--color-sidebar-text)' }}>HR Portal</Typography.Title>
            <Typography.Text style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Human Resources
            </Typography.Text>
          </div>
        )}
      </div>
    </div>
    //style={{ borderTop: '1px solid #4a637a', padding: 16 }}
    
  );
}
