import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';

interface InputProps extends Omit<AntInputProps, 'size'> {
  label?: string;
  error?: string;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  size = 'middle',
  className = '',
  ...props
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <AntInput
        size={size}
        status={error ? 'error' : undefined}
        {...props}
      />
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
