import React from 'react';
import { Avatar, Button, Typography } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

interface SidebarFooterProps {
  isCollapsed: boolean
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  return (
    <div style={{ borderTop: '1px solid #4a637a', padding: 16 }}>
      {isCollapsed ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar size={32} icon={<UserOutlined />} src="/professional-headshot.png" />
          <Button type="text" icon={<LogoutOutlined />} style={{ color: 'var(--color-sidebar-text)' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar size={32} icon={<UserOutlined />} src="/professional-headshot.png" />
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <Typography.Text style={{ color: 'var(--color-sidebar-text)' }}>Sarah Johnson</Typography.Text>
              <Typography.Text style={{ fontSize: 12 }}>HR Manager</Typography.Text>
            </div>
          </div>
          <Button type="text" icon={<LogoutOutlined />} style={{ color: 'var(--color-sidebar-text)' }} />
        </div>
      )}
    </div>
  );
}
