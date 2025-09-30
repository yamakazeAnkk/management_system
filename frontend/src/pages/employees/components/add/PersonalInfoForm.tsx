import React from 'react'
import { Form, Input, Row, Col, Select } from 'antd'

const PersonalInfoForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}> 
            <Input placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}> 
            <Input placeholder="Enter last name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Email Address" name="email" rules={[{ required: true, type: 'email' }]}> 
            <Input type="email" placeholder="employee@company.com" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Phone Number" name="phone"> 
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Date of Birth" name="dob"> 
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Gender" name="gender"> 
            <Select placeholder="Select gender" options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
              { value: 'prefer-not', label: 'Prefer not to say' },
            ]} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Address" name="address"> 
            <Input.TextArea placeholder="Enter full address" rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default PersonalInfoForm


