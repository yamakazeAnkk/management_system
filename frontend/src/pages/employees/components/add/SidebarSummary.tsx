import React from 'react'
import { Card, Button } from 'antd'
import { SaveOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons'

const sections = [
  { id: 'personal', label: 'Personal Info', completed: false },
  { id: 'employment', label: 'Employment Details', completed: false },
  { id: 'compensation', label: 'Compensation', completed: false },
  { id: 'emergency', label: 'Emergency Contact', completed: false },
  { id: 'documents', label: 'Documents', completed: false },
]

const SidebarSummary: React.FC = () => {
  return (
    <Card bodyStyle={{ padding: 16 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Form Summary</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sections.map((section) => (
          <div key={section.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontSize: 13 }}>{section.label}</span>
            <div style={{ height: 20, width: 20, borderRadius: '50%', border: '2px solid #111111' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        <Button size="large" icon={<SaveOutlined />} style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }}>Save Employee</Button>
        <Button size="large" icon={<EyeOutlined />} style={{ background: '#ffffff', borderColor: '#111111', color: '#111111' }}>Preview</Button>
        <Button size="large" icon={<CloseOutlined />} style={{ background: '#ffffff', borderColor: '#111111', color: '#111111' }}>Cancel</Button>
      </div>
    </Card>
  )
}

export default SidebarSummary 


