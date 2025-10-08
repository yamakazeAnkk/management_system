import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

const { TextArea } = Input;

interface NotesModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { notes: string }) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Modal title="Thêm ghi chú phỏng vấn" open={open} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item name="notes" label="Ghi chú" rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}>
          <TextArea rows={4} placeholder="Nhập ghi chú phỏng vấn..." />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Thêm ghi chú</Button>
            <Button onClick={onClose}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotesModal;
