import React from 'react';
import { Card, Row, Col, Input, Select, Tag } from 'antd';

const { Search } = Input;
const { Option } = Select;

interface CandidateFiltersProps {
  searchText: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onSearch: () => void;
  statusLabels: Record<string, string>;
  statusColors: Record<string, string>;
}

const CandidateFilters: React.FC<CandidateFiltersProps> = ({
  searchText,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onSearch,
  statusLabels,
  statusColors,
}) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search candidates..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            onSearch={onSearch}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Filter by stage"
            value={statusFilter}
            onChange={onStatusFilterChange}
            allowClear
            style={{ width: '100%' }}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <Option key={value} value={value}>
                <Tag color={statusColors[value]} style={{ marginRight: 8 }}>
                  {label}
                </Tag>
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

export default CandidateFilters;
