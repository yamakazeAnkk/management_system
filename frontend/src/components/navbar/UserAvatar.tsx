import React from 'react';
import { Avatar, Dropdown, Typography } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuthSimple from '../../hooks/auth/useAuthSimple';

const { Text } = Typography;

interface UserAvatarProps {
  showName?: boolean;
  showRole?: boolean;
  size?: number;
  style?: React.CSSProperties;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  showName = true,
  showRole = true,
  size = 32,
  style
}) => {
  const { user, logout } = useAuthSimple();
  const navigate = useNavigate();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => navigate('/profile/settings'),
    },
    {
      key: 'roles',
      icon: <SafetyCertificateOutlined />,
      label: 'Quản lý vai trò',
      onClick: () => navigate('/roles'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <Dropdown 
      menu={{ items: userMenuItems }} 
      trigger={['click']} 
      placement="bottomRight"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '6px',
          transition: 'background-color 0.2s',
          ...style
        }}
        className="user-profile-dropdown"
      >
        <Avatar
          size={size}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          icon={<UserOutlined />}
        />
        {showName && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text strong style={{ fontSize: '14px', lineHeight: 1.2 }}>
              {user?.firstName} {user?.lastName}
            </Text>
            {showRole && (
              <Text type="secondary" style={{ fontSize: '12px', lineHeight: 1.2 }}>
                HR Manager
              </Text>
            )}
          </div>
        )}
      </div>
    </Dropdown>
  );
};

export default UserAvatar;
