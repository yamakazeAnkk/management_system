import React from 'react';
import { Modal, Form, Rate, Button, Space } from 'antd';

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { rating: number }) => void;
  initialRating?: number;
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, onSubmit, initialRating }) => {
  const [form] = Form.useForm();

  return (
    <Modal title="Đánh giá ứng viên" open={open} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={onSubmit} layout="vertical" initialValues={{ rating: initialRating }}>
        <Form.Item name="rating" label="Đánh giá" rules={[{ required: true, message: 'Vui lòng đánh giá ứng viên' }]}>
          <Rate />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Đánh giá</Button>
            <Button onClick={onClose}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RatingModal;
