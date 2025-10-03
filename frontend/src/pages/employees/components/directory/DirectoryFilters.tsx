import React from 'react'
import { Row, Col, Select, Input, Button, Typography, Card } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

export type DirectoryViewMode = 'list' | 'grid'

interface DirectoryFiltersProps {
  viewMode: DirectoryViewMode
  onViewModeChange: (mode: DirectoryViewMode) => void
}

const DirectoryFilters: React.FC<DirectoryFiltersProps> = () => {
  return (
    <Card style={{ marginBottom: 16, border: '1px solid #e0e0e0', borderRadius: 8 }} bodyStyle={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Typography.Text strong>Directory Filters</Typography.Text>
       
        <Button size="small" type="text" icon={<ReloadOutlined />} style={{ color: 'rgba(0,0,0,0.45)' }}>Clear</Button>
      </div>

      {/* Labels row for filter positions */}
      <Row gutter={[8, 8]} style={{ marginBottom: 4 }}>
        <Col xs={24} md={8}>
          <Typography.Text style={{ color: 'rgba(0,0,0,0.45)' }}>Department</Typography.Text>
        </Col>
        <Col xs={24} md={8}>
          <Typography.Text style={{ color: 'rgba(0,0,0,0.45)' }}>Position</Typography.Text>
        </Col>
        <Col xs={24} md={8}>
          <Typography.Text style={{ color: 'rgba(0,0,0,0.45)' }}>Location</Typography.Text>
        </Col>
        <Col xs={24} md={24} style={{ display: 'none' }} />
      </Row>

      <Row gutter={[8, 8]}>
        <Col xs={24} md={8}>
          <Select placeholder="Team" style={{ width: '100%' }}
            options={[
              { value: 'all', label: 'All Teams' },
              { value: 'core', label: 'Core' },
              { value: 'product', label: 'Product' },
              { value: 'growth', label: 'Growth' },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select placeholder="Seniority" style={{ width: '100%' }}
            options={[
              { value: 'all', label: 'All Levels' },
              { value: 'junior', label: 'Junior' },
              { value: 'mid', label: 'Mid' },
              { value: 'senior', label: 'Senior' },
              { value: 'lead', label: 'Lead' },
            ]}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select placeholder="Availability" style={{ width: '100%' }}
            options={[
              { value: 'all', label: 'All' },
              { value: 'available', label: 'Available' },
              { value: 'busy', label: 'Busy' },
            ]}
          />
        </Col>
        <Col xs={24}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Input allowClear prefix={<SearchOutlined />} placeholder="Search directory..." />
            
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default DirectoryFilters


