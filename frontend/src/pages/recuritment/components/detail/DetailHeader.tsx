import React from 'react';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';

interface DetailHeaderProps {
  onClose: () => void;
  onOpenStatus: () => void;
  onOpenNotes: () => void;
  onOpenRating: () => void;
}

const { Title, Text } = Typography;

const DetailHeader: React.FC<DetailHeaderProps> = ({ onClose, onOpenStatus, onOpenNotes, onOpenRating }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
          Chi tiết ứng viên
        </Title>
        <Text style={{ color: '#6B7280' }}>Xem và quản lý thông tin chi tiết ứng viên</Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onClose}>Đóng</Button>
        <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button>
        <Button onClick={onOpenStatus}>Cập nhật trạng thái</Button>
        <Button onClick={onOpenNotes}>Thêm ghi chú</Button>
        <Button onClick={onOpenRating}>Đánh giá</Button>
      </div>
    </div>
  );
};

export default DetailHeader;
