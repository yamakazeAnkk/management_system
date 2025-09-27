import React from 'react';
import { Badge, Button, Dropdown, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Text } = Typography;

interface NotificationDropdownProps {
  count?: number;
  style?: React.CSSProperties;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  count = 0,
  style = { fontSize: '16px', width: 40, height: 40 }
}) => {
  const notificationItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <Text strong>Yêu cầu nghỉ phép mới</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Nguyễn Văn A đã gửi yêu cầu nghỉ phép
          </Text>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <Text strong>Báo cáo chấm công</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Báo cáo chấm công tháng 12 đã sẵn sàng
          </Text>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div>
          <Text strong>Ứng viên mới</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            3 ứng viên mới đã nộp hồ sơ
          </Text>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'view-all',
      label: <Text style={{ textAlign: 'center', display: 'block' }}>Xem tất cả thông báo</Text>,
    },
  ];

  return (
    <Dropdown
      menu={{ items: notificationItems }}
      trigger={['click']}
      placement="bottomRight"
      overlayStyle={{ width: 320 }}
    >
      <Badge count={count} size="small">
        <Button
          type="text"
          icon={<BellOutlined />}
          style={style}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
