import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import { employeeProfiles } from './Data'
import ProfileHeader from './components/profile/ProfileHeader'
import ProfileContact from './components/profile/ProfileContact'
import ProfileEmployment from './components/profile/ProfileEmployment'
import ProfileCompensation from './components/profile/ProfileCompensation'
import ProfileEmergency from './components/profile/ProfileEmergency'
import ProfileSkillsActivity from './components/profile/ProfileSkillsActivity'

// status styles handled in ProfileHeader

const EmployeeProfilePage: React.FC = () => {
  const params = useParams()
  const id = params.id as string
  const profile = employeeProfiles.find(p => p.id === id)

  if (!profile) return null

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <ProfileHeader profile={profile} />
      <div style={{ paddingTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <ProfileContact profile={profile} />
            <div style={{ height: 16 }} />
            <ProfileEmployment profile={profile} />
            <div style={{ height: 16 }} />
            <ProfileCompensation profile={profile} />
            <div style={{ height: 16 }} />
            <ProfileEmergency profile={profile} />
          </Col>
          <Col xs={24} lg={8}>
            <ProfileSkillsActivity profile={profile} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default EmployeeProfilePage


