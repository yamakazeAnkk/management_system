import React from 'react';
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';

interface BadgeProps extends AntBadgeProps {
  children?: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  size?: 'small' | 'default';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  const getStatus = () => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'processing';
      default:
        return 'default';
    }
  };

  return (
    <AntBadge
      status={getStatus()}
      size={size}
      {...props}
    >
      {children}
    </AntBadge>
  );
};

export default Badge;
