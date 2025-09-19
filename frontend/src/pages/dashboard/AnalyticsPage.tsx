import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  BankOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { Layout } from '../../components';

const AnalyticsPage: React.FC = () => {
  // Mock data
  const statistics = [
    {
      title: 'Tổng người dùng',
      value: 1234,
      icon: <UserOutlined style={{ color: '#1890ff' }} />,
      color: '#1890ff',
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      title: 'Vai trò',
      value: 8,
      icon: <SafetyOutlined style={{ color: '#52c41a' }} />,
      color: '#52c41a',
      change: '+2',
      changeType: 'increase' as const,
    },
    {
      title: 'Phòng ban',
      value: 12,
      icon: <BankOutlined style={{ color: '#faad14' }} />,
      color: '#faad14',
      change: '0%',
      changeType: 'neutral' as const,
    },
    {
      title: 'Hoạt động hôm nay',
      value: 56,
      icon: <TeamOutlined style={{ color: '#f5222d' }} />,
      color: '#f5222d',
      change: '-5%',
      changeType: 'decrease' as const,
    },
  ];

  const userActivityData = [
    { name: 'Đăng nhập', count: 45, percentage: 80 },
    { name: 'Tạo người dùng', count: 12, percentage: 60 },
    { name: 'Cập nhật thông tin', count: 23, percentage: 40 },
    { name: 'Xóa dữ liệu', count: 3, percentage: 20 },
  ];

  const columns = [
    {
      title: 'Hoạt động',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Tỷ lệ',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <Progress percent={percentage} size="small" />
      ),
    },
  ];

  return (
    <Layout>
      <div>
        <h1 style={{ marginBottom: 24 }}>Phân tích & Báo cáo</h1>
        
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          {statistics.map((stat, index) => (
            <Col span={6} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                  valueStyle={{ color: stat.color }}
                  suffix={
                    <span style={{ 
                      fontSize: '12px',
                      color: stat.changeType === 'increase' ? '#52c41a' : 
                             stat.changeType === 'decrease' ? '#f5222d' : '#666'
                    }}>
                      {stat.changeType === 'increase' && <RiseOutlined />}
                      {stat.changeType === 'decrease' && <FallOutlined />}
                      {stat.change}
                    </span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Activity Analysis */}
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Hoạt động người dùng">
              <Table
                columns={columns}
                dataSource={userActivityData}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Thống kê hệ thống">
              <div style={{ padding: '20px 0' }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Hiệu suất hệ thống</span>
                    <span>85%</span>
                  </div>
                  <Progress percent={85} status="active" />
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Dung lượng lưu trữ</span>
                    <span>67%</span>
                  </div>
                  <Progress percent={67} />
                </div>
                
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Băng thông</span>
                    <span>42%</span>
                  </div>
                  <Progress percent={42} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
