import React from 'react';
import { Modal, Form, Select, Button, Space } from 'antd';

interface StatusModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { status: string; nextInterviewDate?: string }) => void;
  statusLabels: Record<string, string>;
}

const { Option } = Select;

const StatusModal: React.FC<StatusModalProps> = ({ open, onClose, onSubmit, statusLabels }) => {
  const [form] = Form.useForm();

  return (
    <Modal title="Cập nhật trạng thái" open={open} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
          <Select placeholder="Chọn trạng thái">
            {Object.entries(statusLabels).map(([value, label]) => (
              <Option key={value} value={value}>{label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Cập nhật</Button>
            <Button onClick={onClose}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StatusModal;
