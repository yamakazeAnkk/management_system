import React from 'react';
import { Dropdown as AntDropdown, DropdownProps as AntDropdownProps } from 'antd';

interface DropdownProps extends AntDropdownProps {
  children: React.ReactNode;
  menu: {
    items: Array<{
      key: string;
      label: React.ReactNode;
      icon?: React.ReactNode;
      onClick?: () => void;
      danger?: boolean;
      type?: 'divider';
    }>;
  };
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  menu,
  trigger = ['click'],
  placement = 'bottomLeft',
  ...props
}) => {
  return (
    <AntDropdown
      menu={menu}
      trigger={trigger}
      placement={placement}
      {...props}
    >
      {children}
    </AntDropdown>
  );
};

export default Dropdown;
