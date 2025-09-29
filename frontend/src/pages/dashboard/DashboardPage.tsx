import React from 'react';
import { Row, Typography, Layout } from 'antd';

import { statistics } from './Data';
import DashboardStats, { StatItem } from './components/DashboardStats';
import RecentActivities from './components/RecentActivities';
import DepartmentOverview from './components/DepartmentOverview';
import Notifications from './components/Notifications';
import AttendanceTrends from './components/AttendanceTrends';
import QuickActions from './components/QuickActions';
import UpcomingEvents from './components/UpcomingEvents';
import TopPerformers from './components/TopPerformers';

const DashboardPage: React.FC = () => {
  return (
    <Layout style={{ background: 'transparent' }}>
      <Layout.Content style={{ background: 'transparent' }}>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Typography.Title
                level={1}
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: '2rem',
                  lineHeight: 1.2,
                }}
              >
                Dashboard
              </Typography.Title>
              <Typography.Text
                style={{
                  color: '#6B7280',
                  fontWeight: 400,
                  fontSize: '1rem',
                }}
              >
                Welcome back! Here's what's happening at your organization.
              </Typography.Text>
            </div>
          </div>

          {/* Statistics Cards */}
          <DashboardStats statistics={statistics as StatItem[]} />

          {/* Row 2: Recent Activities | Department Overview */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <RecentActivities />
            <DepartmentOverview />
          </Row>
          {/* Row 3: Attendance Trends | Quick Actions */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <AttendanceTrends />
            <QuickActions />
          </Row>
          {/* Row 4: Upcoming Events | Top Performers | Notifications */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <UpcomingEvents />
            <TopPerformers />
            <Notifications />
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default DashboardPage;
