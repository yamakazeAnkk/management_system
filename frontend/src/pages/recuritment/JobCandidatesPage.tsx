import React, { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { Candidate } from './types/candidate';
import {
  CandidateHeader,
  CandidateStats,
  CandidateFilters,
  CandidateTable,
} from './components';
import { mockCandidates } from './data/mockCandidates';

const JobCandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const statusColors: Record<string, string> = {
    applied: 'blue',
    screening: 'cyan',
    phone_interview: 'geekblue',
    technical_interview: 'purple',
    on_site_interview: 'magenta',
    final_interview: 'gold',
    offer_sent: 'lime',
    offer_accepted: 'green',
    offer_declined: 'red',
    rejected: 'red',
    withdrawn: 'gray',
  };

  const statusLabels: Record<string, string> = {
    applied: 'Đã ứng tuyển',
    screening: 'Sàng lọc',
    phone_interview: 'Phỏng vấn điện thoại',
    technical_interview: 'Phỏng vấn kỹ thuật',
    on_site_interview: 'Phỏng vấn trực tiếp',
    final_interview: 'Phỏng vấn cuối',
    offer_sent: 'Đã gửi offer',
    offer_accepted: 'Chấp nhận offer',
    offer_declined: 'Từ chối offer',
    rejected: 'Từ chối',
    withdrawn: 'Rút hồ sơ',
  };

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const filteredCandidates = mockCandidates.filter(candidate => {
        const matchesSearch = !searchText || 
          `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchText.toLowerCase()) ||
          candidate.position.toLowerCase().includes(searchText.toLowerCase());
        
        const matchesStatus = !statusFilter || candidate.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      });

      setCandidates(filteredCandidates);
    } catch (error) {
      message.error('Lỗi khi tải danh sách ứng viên');
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  }, [searchText, statusFilter]);

  // Load initial data once
  useEffect(() => {
    if (candidates.length === 0) {
      setCandidates(mockCandidates);
    }
  }, [candidates.length]);

  useEffect(() => {
    if (searchText || statusFilter) {
      fetchCandidates();
    }
  }, [fetchCandidates, searchText, statusFilter]);

  const handleExport = async () => {
    try {
      message.success('Xuất dữ liệu thành công');
    } catch (error) {
      message.error('Lỗi khi xuất dữ liệu');
      console.error('Error exporting candidates:', error);
    }
  };

  const handleAddCandidate = () => {
    message.info('Navigate to add new candidate page');
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <CandidateHeader 
        onAddCandidate={handleAddCandidate}
        onExport={handleExport}
      />

     

      <CandidateFilters
        searchText={searchText}
        statusFilter={statusFilter}
        onSearchChange={setSearchText}
        onStatusFilterChange={setStatusFilter}
        onSearch={fetchCandidates}
        statusLabels={statusLabels}
        statusColors={statusColors}
      />

      <CandidateTable
        candidates={candidates}
        loading={loading}
        statusColors={statusColors}
        statusLabels={statusLabels}
      />
    </div>
  );
};

export default JobCandidatesPage;