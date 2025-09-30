import React from 'react'
import { Form, Input, Row, Col, Select, Checkbox } from 'antd'

const CompensationForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Base Salary" name="salary" rules={[{ required: true }]}> 
            <Input type="number" placeholder="75000" prefix={<span>$</span>} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Salary Type" name="salaryType" initialValue={'annual'}>
            <Select options={[
              { value: 'annual', label: 'Annual' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'hourly', label: 'Hourly' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Currency" name="currency" initialValue={'usd'}>
            <Select options={[
              { value: 'usd', label: 'USD - US Dollar' },
              { value: 'eur', label: 'EUR - Euro' },
              { value: 'gbp', label: 'GBP - British Pound' },
            ]} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Bonus Eligible" name="bonusEligible" initialValue={'yes'}>
            <Select options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Benefits Package" shouldUpdate>
            <Row gutter={[16, 8]}>
              {['Health Insurance','Dental Insurance','Vision Insurance','401(k) Plan','Life Insurance','Flexible PTO'].map((label) => (
                <Col xs={24} md={12} key={label}>
                  <Checkbox>{label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default CompensationForm


