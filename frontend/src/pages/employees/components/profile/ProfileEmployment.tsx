import React from 'react'
import { Card, Typography } from 'antd'
import type { EmployeeProfile } from '../../Data'

interface ProfileEmploymentProps {
  profile: EmployeeProfile
}

const row = (label: string, value: React.ReactNode) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
    <div style={{ color: 'rgba(0,0,0,0.45)' }}>{label}</div>
    <div>{value}</div>
  </div>
)

const ProfileEmployment: React.FC<ProfileEmploymentProps> = ({ profile }) => {
  return (
    <Card bodyStyle={{ padding: 16 }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>Employment Details</Typography.Title>
      {row('Department', profile.department)}
      {row('Reporting Manager', profile.manager)}
      {row('Join Date', profile.joinDate)}
      {row('Employment Type', profile.employmentType)}
      {row('Work Location', profile.workLocation)}
    </Card>
  )
}

export default ProfileEmployment


