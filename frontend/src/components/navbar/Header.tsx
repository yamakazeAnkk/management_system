import React from 'react';
import { Layout, Avatar, Dropdown, Button, Space, Typography } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';
import useAuthSimple from '../../hooks/auth/useAuthSimple';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { user, logout } = useAuthSimple();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: logout,
    },
  ];

  return (
    <AntHeader style={{ 
      padding: '0 24px', 
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    }}>
      
      <Space size="middle">
        <Button type="text" icon={<BellOutlined />} />
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar 
              size="small" 
              icon={<UserOutlined />} 
            />
            <Text strong>{user?.firstName} {user?.lastName}</Text>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;


