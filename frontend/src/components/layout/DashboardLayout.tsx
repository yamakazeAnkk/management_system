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
      <Layout style={{ overflow: 'hidden' }}>
        <Header 
          collapsed={collapsed} 
          onToggle={toggleCollapsed}
        />
        <Content style={{ 
          // margin: '24px 16px', 
          padding: 24, 
          background: '#fff',
          minHeight: 280,
          overflow: 'auto',
          flex: 1,
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;