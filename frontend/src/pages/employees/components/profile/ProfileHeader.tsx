import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Space, Tag, Typography } from 'antd'
import { ArrowLeftOutlined, EditOutlined, DownloadOutlined, MoreOutlined } from '@ant-design/icons'
import type { EmployeeProfile } from '../../Data'

const getStatusStyle = (status: EmployeeProfile['status']): React.CSSProperties => {
  switch (status) {
    case 'Active':
      return { background: 'rgba(34,197,94,0.10)', color: 'rgb(22,163,74)', borderColor: 'transparent' }
    case 'On Leave':
      return { background: 'rgba(249,115,22,0.10)', color: 'rgb(234,88,12)', borderColor: 'transparent' }
    case 'Inactive':
      return { background: 'rgba(107,114,128,0.10)', color: 'rgb(75,85,99)', borderColor: 'transparent' }
    default:
      return { background: 'rgba(107,114,128,0.10)', color: 'rgb(75,85,99)' }
  }
}

interface ProfileHeaderProps {
  profile: EmployeeProfile
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const initials = (profile.name || '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <div style={{ borderBottom: '1px solid #f0f0f0', background: 'var(--color-surface)' }}>
      <div style={{ padding: '16px 0' }}>
        <Link to="/employees" style={{ color: 'rgba(0,0,0,0.45)', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <ArrowLeftOutlined /> Back to All Employees
        </Link>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <Avatar size={96} style={{ backgroundColor: '#111111', color: '#fff' }}>{initials}</Avatar>
            <div>
              <Typography.Title level={1} style={{ margin: 0, fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 }}>{profile.name}</Typography.Title>
              <Typography.Text style={{ display: 'block', color: '#6B7280', marginTop: 4 }}>{profile.position}</Typography.Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <Tag style={getStatusStyle(profile.status)}>{profile.status}</Tag>
                <span style={{ color: 'rgba(0,0,0,0.45)' }}>{profile.id}</span>
                <span style={{ color: 'rgba(0,0,0,0.45)' }}>•</span>
                <span style={{ color: 'rgba(0,0,0,0.65)' }}>{profile.department}</span>
              </div>
            </div>
          </div>
          <Space>
            <Button style={{ background: '#ffffff', borderColor: '#111111', color: '#111111' }} icon={<DownloadOutlined />}>Export</Button>
            <Button style={{ background: '#111111', borderColor: '#111111', color: '#ffffff' }} icon={<EditOutlined />}>Edit Profile</Button>
            <Button type="text" icon={<MoreOutlined />} />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader


