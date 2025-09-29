import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../navbar/Header';
import { Sidebar } from '../sidebar';

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Layout style={{ overflow: 'hidden', background: 'var(--color-surface)' }}>
        <Header 
          collapsed={collapsed} 
          onToggle={toggleCollapsed}
        />
        <Content style={{ 
          padding: 24,
         
          minHeight: 280,
          overflow: 'auto',
          flex: 1,
          background: 'var(--color-surface)',
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;