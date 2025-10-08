import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  StarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

import { Candidate } from '../types/candidate';

interface CandidateStatsProps {
  candidates: Candidate[];
}

const CandidateStats: React.FC<CandidateStatsProps> = ({ candidates }) => {
  const totalCandidates = candidates.length;
  const inInterview = candidates.filter(c => 
    ['technical_interview', 'final_interview'].includes(c.status)
  ).length;
  const offerSent = candidates.filter(c => 
    ['offer_sent', 'offer_accepted'].includes(c.status)
  ).length;
  const successRate = candidates.filter(c => c.status === 'offer_accepted').length;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Total Candidates"
            value={totalCandidates}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="In Interview"
            value={inInterview}
            prefix={<PhoneOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Offer Sent"
            value={offerSent}
            prefix={<StarOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Success Rate"
            value={successRate}
            suffix={`/ ${totalCandidates}`}
            prefix={<FileTextOutlined />}
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CandidateStats;
