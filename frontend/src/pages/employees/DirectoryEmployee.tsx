import React, { useState } from 'react'
import EmployeeTable from './components/all/EmployeeTable'
import EmployeeListHeader, { ViewMode } from './components/all/EmployeeListHeader'
import { Card } from 'antd'
import { employeeProfiles } from './Data'
import DirectoryFilters from './components/directory/DirectoryFilters'
import EmployeePagination from './components/all/EmployeePagination'
import EmployeesStatsCards from './components/all/EmployeesStatsCards'


export function DirectoryEmployee() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const totalEmployees = employeeProfiles.length

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <DirectoryFilters viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
        <EmployeesStatsCards />
      <Card bodyStyle={{ padding: 0 }}>
        
        <EmployeeListHeader totalEmployees={totalEmployees} viewMode={viewMode} onChangeViewMode={setViewMode} />
        <EmployeeTable viewMode={viewMode} selectedRowKeys={selectedRowKeys} onSelectedChange={setSelectedRowKeys} />
        <EmployeePagination total={totalEmployees} current={1} />
      </Card>
    </div>
  )
}
