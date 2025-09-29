import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarHeader } from './SidebarHeader';

const { Sider } = Layout;

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      width={256}
      collapsedWidth={56}
      className={['app-sider', className].filter(Boolean).join(' ')}
      style={{
        background: 'var(--color-sidebar-bg)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        overflow: 'visible',
        borderRight: '1px solid var(--color-sidebar-border)'
      }}
    >
      <div style={{ position: 'absolute', right: -12, top: 32, transform: 'translateY(-50%)', zIndex: 200 }}>
        <Button
          type="default"
          size="small"
          shape="circle"
          icon={isCollapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'var(--color-sidebar-border)',
            color: 'var(--color-sidebar-text)',
            background: 'var(--color-sidebar-hover)',
          }}
        />
      </div>

      <SidebarHeader isCollapsed={isCollapsed} />

      <div style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>

   
    </Sider>
  );
}
