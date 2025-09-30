import React from 'react'
import { Card, Typography } from 'antd'
import type { EmployeeProfile } from '../../Data'

interface ProfileEmergencyProps {
  profile: EmployeeProfile
}

const ProfileEmergency: React.FC<ProfileEmergencyProps> = ({ profile }) => {
  const { emergencyContact } = profile
  return (
    <Card bodyStyle={{ padding: 16 }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>Emergency Contact</Typography.Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Name</div>
          <div>{emergencyContact.name}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Relationship</div>
          <div>{emergencyContact.relationship}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Phone</div>
          <div>{emergencyContact.phone}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Email</div>
          <div>{emergencyContact.email}</div>
        </div>
      </div>
    </Card>
  )
}

export default ProfileEmergency


