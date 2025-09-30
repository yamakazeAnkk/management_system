import React from 'react'
import { Card, Typography } from 'antd'
import type { EmployeeProfile } from '../../Data'

interface ProfileContactProps {
  profile: EmployeeProfile
}

const ProfileContact: React.FC<ProfileContactProps> = ({ profile }) => {
  return (
    <Card className="profile-contact" bodyStyle={{ padding: 16 }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>Contact Information</Typography.Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Email</div>
          <div>{profile.email}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Phone</div>
          <div>{profile.phone}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Location</div>
          <div>{profile.location}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Date of Birth</div>
          <div>{profile.dateOfBirth}</div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Address</div>
          <div>{profile.address}</div>
        </div>
      </div>
    </Card>
  )
}

export default ProfileContact


