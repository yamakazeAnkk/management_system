import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  style?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Tìm kiếm nhân viên, phòng ban...",
  onSearch,
  style = { width: 300 }
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
      style={style}
      allowClear
    />
  );
};

export default SearchBar;
