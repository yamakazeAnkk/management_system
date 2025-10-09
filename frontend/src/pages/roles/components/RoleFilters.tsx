import React from 'react';
import { Card, Button, Space, Input } from 'antd';

export type RoleFilterType = 'all' | 'active' | 'admin' | 'inactive' | 'system';

interface RoleFiltersProps {
  activeFilter: RoleFilterType;
  onFilterChange: (filter: RoleFilterType) => void;
  counts?: {
    all: number;
    active: number;
    admin: number;
    inactive: number;
    system: number;
  };
  searchText?: string;
  onSearchChange?: (value: string) => void;
}

const { Search } = Input;

const RoleFilters: React.FC<RoleFiltersProps> = ({ 
  activeFilter, 
  onFilterChange, 
  counts = { all: 0, active: 0, admin: 0, inactive: 0, system: 0 },
  searchText = '',
  onSearchChange,
}) => {
  const filters = [
    {
      key: 'all' as RoleFilterType,
      label: 'All Roles',
      count: counts.all,
      color: '#1890ff'
    },
    {
      key: 'active' as RoleFilterType,
      label: 'Active',
      count: counts.active,
      color: '#52c41a'
    },
    {
      key: 'admin' as RoleFilterType,
      label: 'Admin Access',
      count: counts.admin,
      color: '#faad14'
    },
    {
      key: 'inactive' as RoleFilterType,
      label: 'Inactive',
      count: counts.inactive,
      color: '#f5222d'
    },
    {
      key: 'system' as RoleFilterType,
      label: 'System Default',
      count: counts.system,
      color: '#722ed1'
    }
  ];

  return (
    <Card style={{padding: 0, marginBottom: 18, border: '1px solid #e0e0e0' }}>
      
        
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12,
        flexWrap: 'nowrap',
        
      }}>
         <div style={{ minWidth: 260 }}>
          <Search
            placeholder="Search roles..."
            allowClear
            size="middle"
            value={searchText}
            onSearch={onSearchChange}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
        <Space wrap style={{ flex: 1 }}>
          {filters.map((filter) => (
            <Button
              key={filter.key}
              type={activeFilter === filter.key ? 'primary' : 'default'}
              onClick={() => onFilterChange(filter.key)}
              style={{
                background: activeFilter === filter.key ? '#000000' : '#ffffff',
                borderColor: activeFilter === filter.key ? '#000000' : '#d9d9d9',
                color: activeFilter === filter.key ? '#ffffff' : '#000000',
                fontWeight: activeFilter === filter.key ? 600 : 400,
                borderRadius: '6px',
                height: '32px',
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minWidth: '100px',
                justifyContent: 'center'
              }}
            >
              {filter.label}
              {filter.count > 0 && (
                <span style={{
                  background: activeFilter === filter.key ? 'rgba(255,255,255,0.2)' : '#f5f5f5',
                  color: activeFilter === filter.key ? '#ffffff' : '#000000',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  {filter.count}
                </span>
              )}
            </Button>
          ))}
        </Space>

       
      </div>
    </Card>
  );
};

export default RoleFilters;
