import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'middle',
  loading = false,
  onClick,
  htmlType = 'button',
  className = '',
  ...props
}) => {
  const getType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'success':
        return 'primary';
      case 'error':
        return 'primary';
      case 'warning':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const getDanger = () => {
    return variant === 'error';
  };

  return (
    <AntButton
      type={getType()}
      size={size}
      loading={loading}
      onClick={onClick}
      htmlType={htmlType}
      className={className}
      danger={getDanger()}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
