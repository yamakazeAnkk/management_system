import React from 'react';
import {
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  BankOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

// Only export components, not objects/constants, to support Fast Refresh
export const DashboardIcon: React.FC = () => <DashboardOutlined />;
export const TeamIcon: React.FC = () => <TeamOutlined />;
export const RoleIcon: React.FC = () => <SafetyOutlined />;
export const DepartmentIcon: React.FC = () => <BankOutlined />;
export const UserIcon: React.FC = () => <UserOutlined />;
export const SettingIcon: React.FC = () => <SettingOutlined />;
export const LogoIcon: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <AppstoreOutlined {...props} />
);
