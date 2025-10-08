import React from 'react';
import { Card, Tabs, Row, Col, Timeline, Typography, Tag, Descriptions } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { CandidateDetail } from '../../types/candidateDetail';

const { TabPane } = Tabs;
const { Text, Paragraph } = Typography;

interface DetailTabsProps {
  candidate: CandidateDetail;
}

const DetailTabs: React.FC<DetailTabsProps> = ({ candidate }) => {
  return (
    <Card>
      <Tabs defaultActiveKey="overview">
        <TabPane tab="Tổng quan" key="overview">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card title="Kỹ năng">
                <div>
                  {candidate.skills.map(skill => (
                    <Tag key={skill} style={{ marginBottom: 8 }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Card>

              <Card title="Kinh nghiệm làm việc" style={{ marginTop: 16 }}>
                <Timeline>
                  {candidate.workExperience.map((exp, index) => (
                    <Timeline.Item key={index}>
                      <div>
                        <Text strong>{exp.position}</Text>
                        <br />
                        <Text type="secondary">{exp.company}</Text>
                        <br />
                        <Text type="secondary">
                          {new Date(exp.startDate).toLocaleDateString('vi-VN')} - {exp.current ? 'Hiện tại' : new Date(exp.endDate!).toLocaleDateString('vi-VN')}
                        </Text>
                        <Paragraph style={{ marginTop: 8 }}>
                          {exp.description}
                        </Paragraph>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Tiến trình tuyển dụng">
                <Timeline items={[
                  { color: 'green', children: (
                    <div>
                      <Text strong>Đã ứng tuyển</Text>
                      <br />
                      <Text type="secondary">{new Date(candidate.appliedDate).toLocaleString('vi-VN')}</Text>
                    </div>
                  )},
                  ...(candidate.lastContactDate ? [{ color: 'blue', children: (
                    <div>
                      <Text strong>Liên hệ cuối</Text>
                      <br />
                      <Text type="secondary">{new Date(candidate.lastContactDate).toLocaleString('vi-VN')}</Text>
                    </div>
                  )}] : []),
                  ...(candidate.nextInterviewDate ? [{ color: 'orange', children: (
                    <div>
                      <Text strong>Phỏng vấn tiếp theo</Text>
                      <br />
                      <Text type="secondary">{new Date(candidate.nextInterviewDate).toLocaleString('vi-VN')}</Text>
                    </div>
                  )}] : []),
                ]} />
              </Card>

              <Card title="Ghi chú phỏng vấn" style={{ marginTop: 16 }}>
                {candidate.interviewNotes ? (
                  <Paragraph>{candidate.interviewNotes}</Paragraph>
                ) : (
                  <Text type="secondary">Chưa có ghi chú</Text>
                )}
              </Card>

              <Card title="Thông tin khác" style={{ marginTop: 16 }}>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Nguồn ứng tuyển">
                    {candidate.source}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày có thể bắt đầu">
                    {candidate.availabilityDate ? new Date(candidate.availabilityDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Học vấn" key="education">
          <Card>
            <Timeline>
              {candidate.education.map((edu, index) => (
                <Timeline.Item key={index} dot={<BookOutlined />}>
                  <div>
                    <Text strong>{edu.degree} - {edu.field}</Text>
                    <br />
                    <Text type="secondary">{edu.institution}</Text>
                    <br />
                    <Text type="secondary">
                      {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Hiện tại'}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </TabPane>

        <TabPane tab="Thư xin việc" key="coverLetter">
          <Card>
            {candidate.coverLetter ? (
              <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                {candidate.coverLetter}
              </Paragraph>
            ) : (
              <Text type="secondary">Ứng viên chưa gửi thư xin việc</Text>
            )}
          </Card>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default DetailTabs;
