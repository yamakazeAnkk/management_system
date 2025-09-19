import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  BankOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../../constants';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const menuItems = [
    {
      key: ROUTES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: ROUTES.USERS,
      icon: <TeamOutlined />,
      label: 'Quản lý người dùng',
    },
    {
      key: ROUTES.ROLES,
      icon: <SafetyOutlined />,
      label: 'Quản lý vai trò',
    },
    {
      key: ROUTES.DEPARTMENTS,
      icon: <BankOutlined />,
      label: 'Quản lý phòng ban',
    },
    {
      type: 'divider' as const,
    },
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: ROUTES.SETTINGS,
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      style={{
        background: '#fff',
        boxShadow: '2px 0 8px rgba(0, 21, 41, 0.08)',
      }}
    >
      <div style={{ 
        height: 32, 
        margin: 16, 
        background: 'rgba(24, 144, 255, 0.1)',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1890ff',
        fontWeight: 'bold',
        fontSize: collapsed ? '12px' : '14px',
      }}>
        {collapsed ? 'MS' : 'Management System'}
      </div>
      
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[ROUTES.DASHBOARD]}
        items={menuItems}
        style={{
          border: 'none',
        }}
      />
    </Sider>
  );
};

export default Sidebar;
