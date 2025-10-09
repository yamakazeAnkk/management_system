import React from 'react';
import { Card, Table, Typography, Tag } from 'antd';

const { Text } = Typography;

import { Candidate } from '../types/candidate';
import { Link } from 'react-router-dom';

interface CandidateTableProps {
  candidates: Candidate[];
  loading: boolean;
  statusColors: Record<string, string>;
  statusLabels: Record<string, string>;
}

const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  loading,
  statusColors,
  statusLabels,
}) => {
  const columns = [    
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (firstName: string, record: Candidate) => (
        <Link
          to={`/recruitment/candidates/${record.id}`}
          style={{ fontWeight: 700, color: 'inherit' }}
        >
          {firstName} {record.lastName}
        </Link>
      ),
      sorter: (a: Candidate, b: Candidate) => 
        `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone?: string) => phone || '-',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Text style={{ fontSize: '13px' }}>{email}</Text>
      ),
    },
    {
      title: 'Positions',
      dataIndex: 'position',
      key: 'position',
      render: (position: string, record: Candidate) => (
        <div>
          <div style={{ fontWeight: 500 }}>{position}</div>
          {record.department && (
            <Tag style={{ marginTop: 4 }}>{record.department}</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status]}>
          {statusLabels[status]}
        </Tag>
      ),
    },
    {
      title: 'Created date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
      sorter: (a: Candidate, b: Candidate) => 
        new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime(),
    },
    {
      title: 'Candidate source',
      dataIndex: 'source',
      key: 'source',
      render: (source: string) => (
        <Text style={{ fontSize: '13px' }}>{source}</Text>
      ),
    },
  ];

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Table
        columns={columns}
        dataSource={candidates}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} candidates`,
        }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
};

export default CandidateTable;
