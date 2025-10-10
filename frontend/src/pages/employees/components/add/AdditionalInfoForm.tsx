import React from 'react'
import { Form, Input, Select } from 'antd'  

const AdditionalInfoForm: React.FC = () => {
  return (
    <Form layout="vertical" style={{ padding: 16 }}>
      <Form.Item label="Skills & Expertise" name="skills">
        <Select
          mode="tags"
          placeholder="Add skills (press Enter to add new skill)"
          style={{ width: '100%' }}
          tokenSeparators={[',']}
        />
      </Form.Item>
      <Form.Item label="Notes" name="notes">
        <Input.TextArea rows={4} placeholder="Add any additional notes" />
      </Form.Item>
    </Form>
  )
}

export default AdditionalInfoForm


