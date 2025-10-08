import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';
import { 
  DetailHeader,
  DetailInfoHeader,
  DetailTabs,
  StatusModal,
  NotesModal,
  RatingModal,
} from './components/detail';
import { CandidateDetail } from './types/candidateDetail';

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

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

  const fetchCandidate = useCallback(async () => {
    try {
      const mockData: CandidateDetail = {
        id: '1',
        firstName: 'Nguyễn',
        lastName: 'Văn A',
        email: 'nguyenvana@email.com',
        phone: '0123456789',
        position: 'Frontend Developer',
        department: 'IT',
        experience: 3,
        skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Jest'],
        education: [
          { institution: 'Đại học Bách Khoa Hà Nội', degree: 'Cử nhân', field: 'Công nghệ thông tin', startDate: '2018-09-01', endDate: '2022-06-30', gpa: 3.5 },
        ],
        workExperience: [
          { company: 'TechCorp Vietnam', position: 'Junior Frontend Developer', startDate: '2022-07-01', endDate: '2023-12-31', current: false, description: 'Phát triển các ứng dụng web sử dụng React và Node.js' },
          { company: 'StartupXYZ', position: 'Frontend Developer', startDate: '2024-01-01', current: true, description: 'Phát triển ứng dụng web cho startup fintech' },
        ],
        status: 'technical_interview',
        source: 'LinkedIn',
        rating: 4,
        appliedDate: '2024-01-15T00:00:00Z',
        lastContactDate: '2024-01-20T00:00:00Z',
        nextInterviewDate: '2024-02-01T00:00:00Z',
        expectedSalary: 15000000,
        availabilityDate: '2024-02-15T00:00:00Z',
        interviewNotes: 'Ứng viên có kiến thức tốt về React và TypeScript. Thể hiện khả năng giải quyết vấn đề tốt.',
        coverLetter: 'Tôi rất quan tâm đến vị trí Frontend Developer tại công ty...'
      };
      setCandidate(mockData);
    } catch (error) {
      message.error('Lỗi khi tải thông tin ứng viên');
      console.error('Error fetching candidate:', error);
    }
  }, []);

  useEffect(() => { if (id) { fetchCandidate(); } }, [id, fetchCandidate]);

  const handleUpdateStatus = async (values: { status: string; nextInterviewDate?: string }) => {
    setCandidate(prev => prev ? { ...prev, ...values } : null);
    setStatusOpen(false);
    message.success('Cập nhật trạng thái thành công');
  };
  const handleAddNotes = async (values: { notes: string }) => {
    setCandidate(prev => prev ? { ...prev, interviewNotes: values.notes } : null);
    setNotesOpen(false);
    message.success('Thêm ghi chú thành công');
  };
  const handleRateCandidate = async (values: { rating: number }) => {
    setCandidate(prev => prev ? { ...prev, rating: values.rating } : null);
    setRatingOpen(false);
    message.success('Đánh giá ứng viên thành công');
  };

  return (
    <Modal
      open={true}
      onCancel={() => navigate('/recruitment/candidates')}
      footer={null}
      width="95vw"
      style={{ top: 20 }}
      bodyStyle={{ padding: 0, height: '90vh', overflow: 'auto' }}
      destroyOnClose={false}
    >
      {!candidate ? (
        <div style={{ padding: 24 }}>Loading...</div>
      ) : (
        <div style={{ maxWidth: '100%', margin: 0, padding: 16 }}>
          <DetailHeader
            onClose={() => navigate('/recruitment/candidates')}
            onOpenStatus={() => setStatusOpen(true)}
            onOpenNotes={() => setNotesOpen(true)}
            onOpenRating={() => setRatingOpen(true)}
          />

          <DetailInfoHeader
            candidate={candidate}
            statusLabels={statusLabels}
            statusColors={statusColors}
          />

          <DetailTabs candidate={candidate} />

          <StatusModal
            open={statusOpen}
            onClose={() => setStatusOpen(false)}
            onSubmit={handleUpdateStatus}
            statusLabels={statusLabels}
          />
          <NotesModal
            open={notesOpen}
            onClose={() => setNotesOpen(false)}
            onSubmit={handleAddNotes}
          />
          <RatingModal
            open={ratingOpen}
            onClose={() => setRatingOpen(false)}
            onSubmit={handleRateCandidate}
            initialRating={candidate.rating}
          />
        </div>
      )}
    </Modal>
  );
};

export default CandidateDetailPage;
