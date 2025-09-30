import React from 'react'
import { Form, Input } from 'antd'  

const AdditionalInfoForm: React.FC = () => {
  return (
    <Form layout="vertical" style={{ padding: 16 }}>
      <Form.Item label="Skills & Expertise" name="skills">
        <Input.TextArea rows={4} placeholder="List relevant skills, certifications, and expertise" />
      </Form.Item>
      <Form.Item label="Notes" name="notes">
        <Input.TextArea rows={4} placeholder="Add any additional notes" />
      </Form.Item>
    </Form>
  )
}

export default AdditionalInfoForm


