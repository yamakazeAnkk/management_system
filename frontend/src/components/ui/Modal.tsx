import React from 'react';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';

interface ModalProps extends AntModalProps {
  title?: string;
  children: React.ReactNode;
  visible?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  confirmLoading?: boolean;
  width?: number | string;
  centered?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  visible = false,
  onCancel,
  onOk,
  confirmLoading = false,
  width = 520,
  centered = true,
  ...props
}) => {
  return (
    <AntModal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      width={width}
      centered={centered}
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
