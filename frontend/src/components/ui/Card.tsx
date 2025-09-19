import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';

interface CardProps extends AntCardProps {
  title?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  loading?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  hoverable = false,
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <AntCard
      title={title}
      hoverable={hoverable}
      loading={loading}
      className={className}
      {...props}
    >
      {children}
    </AntCard>
  );
};

export default Card;
