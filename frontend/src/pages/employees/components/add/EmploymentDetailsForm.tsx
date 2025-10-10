import React from 'react'
import { Form, Input, Row, Col, Select } from 'antd'

const EmploymentDetailsForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true }]}> 
            <Input placeholder="EMP001" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true }]}> 
            <Input placeholder="Software Engineer" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Department" name="department" rules={[{ required: true }]}>
            <Select placeholder="Select department" options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'sales', label: 'Sales' },
              { value: 'hr', label: 'HR' },
              { value: 'finance', label: 'Finance' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Reporting Manager" name="manager">
            <Select placeholder="Select manager" options={[
              { value: 'john', label: 'John Smith' },
              { value: 'sarah', label: 'Sarah Wilson' },
              { value: 'michael', label: 'Michael Davis' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Start Date" name="startDate" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Employment Type" name="employmentType" rules={[{ required: true }]}>
            <Select placeholder="Select type" options={[
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'intern', label: 'Intern' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Work Location" name="location">
            <Select placeholder="Select location" options={[
              { value: 'hq', label: 'Headquarters' },
              { value: 'remote', label: 'Remote' },
              { value: 'branch1', label: 'Branch Office 1' },
              { value: 'branch2', label: 'Branch Office 2' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Employee Status" name="status" initialValue={'active'}>
            <Select options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'on-leave', label: 'On Leave' },
              { value: 'terminated', label: 'Terminated' },
            ]} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default EmploymentDetailsForm


