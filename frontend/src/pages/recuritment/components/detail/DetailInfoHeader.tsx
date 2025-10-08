import React from 'react';
import { Card, Row, Col, Avatar, Typography, Space, Tag } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, ShopOutlined, FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { CandidateDetail } from '../../types/candidateDetail';

const { Title, Text } = Typography;

interface DetailInfoHeaderProps {
  candidate: CandidateDetail;
  statusLabels: Record<string, string>;
  statusColors: Record<string, string>;
}

const Divider = () => (
  <div style={{ width: 1, height: 80, backgroundColor: '#d9d9d9', margin: '0 auto' }} />
);

const DetailInfoHeader: React.FC<DetailInfoHeaderProps> = ({ candidate, statusLabels, statusColors }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={0} align="middle" style={{ minHeight: 120 }}>
        <Col span={4}>
          <div style={{ textAlign: 'center', padding: '0 16px' }}>
            <Avatar size={80} icon={<UserOutlined />} />
          </div>
        </Col>
        <Col span={1}><Divider /></Col>
        <Col span={6}>
          <div style={{ padding: '0 16px' }}>
            <Title level={4} style={{ margin: '0 0 8px 0', color: '#1890ff' }}>
              {candidate.firstName} {candidate.lastName}
            </Title>
            <Space direction="vertical" size={4}>
              <Space>
                <PhoneOutlined style={{ color: '#666' }} />
                <Text>{candidate.phone || '-'}</Text>
              </Space>
              <Space>
                <MailOutlined style={{ color: '#666' }} />
                <Text>{candidate.email}</Text>
              </Space>
            </Space>
          </div>
        </Col>
        <Col span={1}><Divider /></Col>
        <Col span={4}>
          <div style={{ padding: '0 16px' }}>
            <Space direction="vertical" size={4}>
              <Space>
                <ShopOutlined style={{ color: '#666' }} />
                <Text>-</Text>
              </Space>
              <Space>
                <FileTextOutlined style={{ color: '#666' }} />
                <Text>{candidate.position}</Text>
              </Space>
              <Space>
                <ClockCircleOutlined style={{ color: '#666' }} />
                <Text>{candidate.experience} năm</Text>
              </Space>
            </Space>
          </div>
        </Col>
        <Col span={1}><Divider /></Col>
        <Col span={4}>
          <div style={{ padding: '0 16px' }}>
            <Space direction="vertical" size={4}>
              <Space>
                <UserOutlined style={{ color: '#666' }} />
                <Text>-</Text>
              </Space>
              <Space>
                <ShopOutlined style={{ color: '#666' }} />
                <Text>{candidate.department || '-'}</Text>
              </Space>
            </Space>
          </div>
        </Col>
        <Col span={1}><Divider /></Col>
        {/* <Col span={3}>
          <div style={{ padding: '0 16px' }}>
            <Space direction="vertical" size={4}>
              <Tag color={statusColors[candidate.status]}>{statusLabels[candidate.status]}</Tag>
            </Space>
          </div>
        </Col> */}
      </Row>
    </Card>
  );
};

export default DetailInfoHeader;
