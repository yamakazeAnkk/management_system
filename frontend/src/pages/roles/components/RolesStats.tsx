import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import {
  SafetyOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Role } from '../data/role';

export interface RoleStatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

interface RoleStatsProps {
  roles: Role[];
  usersAssignedCount?: number;
}

const RoleStats: React.FC<RoleStatsProps> = ({ roles, usersAssignedCount }) => {
  const totalRoles = roles.length;
  const activeRoles = roles.filter(r => r.isActive).length;
  const customRoles = roles.filter(r => !r.isSystem).length;
  const usersAssigned = typeof usersAssignedCount === 'number' ? usersAssignedCount : 0;

  // Define stats data
  const statistics: RoleStatItem[] = [
    {
      title: "Total Roles",
      value: totalRoles,
      icon: <SafetyOutlined style={{ color: '#1890ff' }} />,
      color: '#000000',
      subtitle: "All system roles"
    },
    {
      title: "Active Roles",
      value: activeRoles,
      icon: <TeamOutlined style={{ color: '#52c41a' }} />,
      color: '#000000',
      subtitle: "Currently in use"
    },
    {
      title: "Custom Roles",
      value: customRoles,
      icon: <UserSwitchOutlined style={{ color: '#faad14' }} />,
      color: '#000000',
      subtitle: "User created"
    },
    {
      title: "Users Assigned",
      value: usersAssigned,
      icon: <UserOutlined style={{ color: '#722ed1' }} />,
      color: '#000000',
      subtitle: "Total assigned"
    }
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {statistics.map((stat, index) => (
          <div key={index} style={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card
              style={{
                height: 148,
                borderRadius: 8,
                border: '1px solid #f0f0f0',
                // boxShadow: '0 10px 16px -12px rgba(0,0,0,0.5)'
              }}
              bodyStyle={{ padding: 10, height: '100%' }}
            >
              <div style={{ position: 'relative', height: '100%' }}>
                {/* Icon ở góc trên bên phải */}
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  fontSize: 32,
                  opacity: 0.8
                }}>
                  {stat.icon}
                </div>
                
                {/* Content ở bên trái */}
                <div style={{ 
                  paddingRight: 40, // Tạo khoảng trống cho icon
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ color: stat.color }}>
                    <Statistic
                      valueStyle={{ 
                        color: 'inherit', 
                        fontSize: 32, 
                        fontWeight: 600 
                      }}
                      title={stat.title}
                      value={stat.value}
                    />
                  </div>
                  {stat.subtitle && (
                    <Typography.Text style={{ color: stat.color, fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                      {stat.subtitle}
                    </Typography.Text>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleStats;
