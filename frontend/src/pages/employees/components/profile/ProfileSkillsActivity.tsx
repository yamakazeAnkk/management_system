import React from 'react'
import { Card, Typography, Tag } from 'antd'
import type { EmployeeProfile } from '../../Data'

interface ProfileSkillsActivityProps {
  profile: EmployeeProfile
}

const ProfileSkillsActivity: React.FC<ProfileSkillsActivityProps> = ({ profile }) => {
  return (
    <>
      <Card bodyStyle={{ padding: 16 }} style={{ marginBottom: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>Skills & Expertise</Typography.Title>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {profile.skills.map((s) => (
            <Tag key={s} color="#f6ffed" style={{ color: '#52c41a', borderColor: '#b7eb8f' }}>{s}</Tag>
          ))}
        </div>
      </Card>

      <Card bodyStyle={{ padding: 16 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>Recent Activity</Typography.Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {profile.recentActivity.map((a, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8 }}>
              <div style={{ height: 8, width: 8, borderRadius: 999, background: '#1677ff', marginTop: 6 }} />
              <div>
                <div style={{ fontWeight: 500 }}>{a.action}</div>
                <div style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

export default ProfileSkillsActivity


