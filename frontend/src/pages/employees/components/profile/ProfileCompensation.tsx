import React from 'react'
import { Card, Typography, Tag } from 'antd'
import type { EmployeeProfile } from '../../Data'

interface ProfileCompensationProps {
  profile: EmployeeProfile
}

const ProfileCompensation: React.FC<ProfileCompensationProps> = ({ profile }) => {
  return (
    <Card bodyStyle={{ padding: 16 }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>Compensation & Benefits</Typography.Title>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Base Salary</div>
          <div>{profile.salary}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Salary Type</div>
          <div>{profile.salaryType}</div>
        </div>
        <div>
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>Bonus Eligible</div>
          <div>{profile.bonusEligible}</div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}>Benefits Package</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {profile.benefits.map((b) => (
            <Tag key={b} color="#e6f4ff" style={{ color: '#1677ff', borderColor: '#91caff' }}>{b}</Tag>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ProfileCompensation


