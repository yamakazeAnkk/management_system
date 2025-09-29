import React from 'react';
import { Layout, Space } from 'antd';
// import SearchBar from './SearchBar';
import NotificationDropdown from './NotificationDropdown';
import UserAvatar from './UserAvatar';

const { Header: AntHeader } = Layout;

export interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <AntHeader style={{ 
      padding: '0 24px', 
      background: 'var(--color-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1,

    }}>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchBar />
      </div> */}
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Space size="large">
          <NotificationDropdown count={3} />
          <UserAvatar />
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;


