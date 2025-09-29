import React from 'react';
import { Card, Col, Tag } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { upcomingEvents } from '../Data';

const UpcomingEvents: React.FC = () => {
  return (
    <Col xs={24} sm={24} md={24} lg={8}>
      <Card title="Upcoming Events" style={{ height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {upcomingEvents.map((event) => (
            <div key={event.id} style={{ padding: 12, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{event.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CalendarOutlined /> {event.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ClockCircleOutlined /> {event.time}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                  <EnvironmentOutlined /> {event.location}
                </span>
                <Tag style={{ fontSize: 12 }}>{event.attendees} attendees</Tag>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default UpcomingEvents;


