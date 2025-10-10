import React from 'react'
import { Form, Input, Row, Col, Select } from 'antd'

const EmergencyContactForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Contact Name" name="name"> 
            <Input placeholder="Full name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Relationship" name="relationship"> 
            <Select placeholder="Select relationship" options={[
              { value: 'spouse', label: 'Spouse' },
              { value: 'parent', label: 'Parent' },
              { value: 'sibling', label: 'Sibling' },
              { value: 'friend', label: 'Friend' },
              { value: 'other', label: 'Other' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Phone Number" name="phoneEmergency"> 
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Email Address" name="emailEmergency"> 
            <Input type="email" placeholder="contact@email.com" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default EmergencyContactForm


