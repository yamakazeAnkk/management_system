import React from 'react'   
import { Row, Col, Typography, Card } from 'antd'
import { RightOutlined, UserOutlined, FileTextOutlined, DollarOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import PersonalInfoForm from './components/add/PersonalInfoForm'
import EmploymentDetailsForm from './components/add/EmploymentDetailsForm'
import CompensationForm from './components/add/CompensationForm'
import EmergencyContactForm from './components/add/EmergencyContactForm'
import DocumentsUploadForm from './components/add/DocumentsUploadForm'
import AdditionalInfoForm from './components/add/AdditionalInfoForm'
import SidebarSummary from './components/add/SidebarSummary'

const AddEmployeesPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid #f0f0f0', background: 'var(--color-surface)' }}>
        <div style={{ padding: '16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>
            <Link to="/employees" style={{ color: 'rgba(0,0,0,0.45)' }}>Employee</Link>
            <RightOutlined />
            <span style={{ color: 'rgba(0,0,0,0.88)' }}>Add Employee</span>
          </div>
          <Typography.Title level={1} style={{ margin: 0, fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 }}>Add New Employee</Typography.Title>
          <Typography.Text style={{ color: '#6B7280' }}>
            Fill in the details below to add a new employee to your organization.
          </Typography.Text>
        </div>
      </div>

      <div style={{ paddingTop: 24 }}>
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} lg={16}>
            <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <UserOutlined />
                <Typography.Title level={4} style={{ margin: 0 }}>Personal Information</Typography.Title>
              </div>
              <PersonalInfoForm />
            </Card>

            <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <FileTextOutlined />
                <Typography.Title level={4} style={{ margin: 0 }}>Employment Details</Typography.Title>
              </div>
              <EmploymentDetailsForm />
            </Card>

            <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <DollarOutlined />
                <Typography.Title level={4} style={{ margin: 0 }}>Compensation & Benefits</Typography.Title>
              </div>
              <CompensationForm />
            </Card>

            <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <PhoneOutlined />
                <Typography.Title level={4} style={{ margin: 0 }}>Emergency Contact</Typography.Title>
              </div>
              <EmergencyContactForm />
            </Card>

            <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <UploadOutlined />
                <Typography.Title level={4} style={{ margin: 0 }}>Document Upload</Typography.Title>
              </div>
              <DocumentsUploadForm />
            </Card>

            <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <FileTextOutlined />
                <Typography.Title level={4} style={{ margin: 0 }}>Additional Information</Typography.Title>
              </div>
              <AdditionalInfoForm />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <SidebarSummary />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddEmployeesPage


