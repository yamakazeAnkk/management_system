import React from 'react';
import { Button } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

export type ViewMode = 'grid' | 'list';

interface EmployeeListHeaderProps {
  totalEmployees: number;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
}

const EmployeeListHeader: React.FC<EmployeeListHeaderProps> = ({ totalEmployees, viewMode, onChangeViewMode }) => {
  return (
    <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2 style={{ marginTop: 12, marginBottom: 12, fontWeight: 600, fontSize: 16 }}>Employee List</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ marginTop: 12, marginBottom: 12, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Showing 1-10 of {totalEmployees} employees</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Button
            type={viewMode === 'grid' ? 'primary' : 'default'}
            size="small"
            // style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
            onClick={() => onChangeViewMode('grid')}
            icon={<AppstoreOutlined />}
          />
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            size="small"
            style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
            onClick={() => onChangeViewMode('list')}
            icon={<UnorderedListOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeListHeader;


