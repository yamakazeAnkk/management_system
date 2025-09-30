
import { useState } from "react"
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
} from "antd"
import { MailOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"


import EmployeesStatsCards from './components/EmployeesStatsCards';

import EmployeeFilter from "./components/Filter"
import EmployeeListHeader, { ViewMode } from './components/EmployeeListHeader';
import ExportButton from './components/ExportButton';
import AddEmployeeButton from './components/AddEmployeeButton';
import EmployeeTable, { EmployeeRow } from './components/EmployeeTable';
import EmployeePagination from './components/EmployeePagination';
import { initialEmployeeData } from './Data';









export function AllEmployeesPage() {
  

  const [viewMode, setViewMode] = useState<ViewMode>('list');


  // Sample employee data
  const initialData: EmployeeRow[] = initialEmployeeData.map((e, idx) => ({
    key: String(idx + 1),
    id: e.id,
    name: e.name,
    email: e.email,
    phone: e.phone,
    department: e.department,
    position: e.position,
    status: e.status as EmployeeRow['status'],
    joinDate: e.joinDate,
  }));

  const [employees] = useState<EmployeeRow[]>(initialData)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  

  // Table props moved to EmployeeTable component

 
  // const showModal = () => setIsModalVisible(true)



 

  // Table props moved to EmployeeTable component

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Typography.Title
            level={1}
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: '2rem',
              lineHeight: 1.2,
            }}
          >
            All Employees
          </Typography.Title>
          <Typography.Text
            style={{
              color: '#6B7280',
              fontWeight: 400,
              fontSize: '1rem',
            }}
          >
            Manage your organization's employee database
          </Typography.Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ExportButton />
          <AddEmployeeButton />
        </div>
      </div>
      

      {/* Summary Statistics */}
      <EmployeesStatsCards />

      {/* Filter + Table Row */}
      <Row gutter={[16, 16]} align="stretch" style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <EmployeeFilter />
        </Col>
        <Col xs={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <EmployeeListHeader totalEmployees={employees.length} viewMode={viewMode} onChangeViewMode={setViewMode} />
            <EmployeeTable employees={employees} selectedRowKeys={selectedRowKeys} onSelectedChange={setSelectedRowKeys} />
            <EmployeePagination total={employees.length} current={1} />
          </Card>
        </Col>
      </Row>

      {/* Bulk Actions */}
      <Card style={{ padding: 16, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontWeight: 600 }}>Bulk Actions</h3>
          <Button
            disabled={selectedRowKeys.length === 0}
            size="small"
            style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
            icon={<MailOutlined style={{ color: '#ffffff' }} />}
          >
            Send Email
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0}
            size="small"
            style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
            icon={<DownloadOutlined style={{ color: '#ffffff' }} />}
          >
            Export Selected
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0}
            size="small"
            style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}
            icon={<EditOutlined style={{ color: '#ffffff' }} />}
          >
            Bulk Edit
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0}
            size="small"
            danger
            icon={<DeleteOutlined />}
          >
            Delete Selected
          </Button>
        </div>
      </Card>
       
     

      {/* Add Employee Modal */}
      
    </div>
  )
}
