import React from 'react';
import { Badge, Card, Col } from 'antd';
import { BellOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { notifications } from '../Data';
export type NotificationItem = {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'warning' | 'success';
    unread: boolean;
  };
const Notifications: React.FC = () => {
  const unreadCount = notifications.filter((n: NotificationItem) => n.unread).length;
  return (
    <Col xs={24} sm={24} md={24} lg={7}>
      <Card
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BellOutlined /> Notifications
          </span>
        }
        extra={<Badge count={unreadCount} style={{ backgroundColor: '#f5222d' }} />}
        style={{ height: '100%' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.06)',
                background: notification.unread ? 'rgba(0,0,0,0.02)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                {notification.type === 'warning' && (
                  <ExclamationCircleTwoTone twoToneColor="#fa8c16" style={{ marginTop: 2 }} />
                )}
                {notification.type === 'success' && (
                  <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginTop: 2 }} />
                )}
                {notification.type === 'info' && (
                  <InfoCircleTwoTone twoToneColor="#1890ff" style={{ marginTop: 2 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{notification.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{notification.message}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginTop: 4 }}>{notification.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default Notifications;


