export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department?: string;
  experience: number; // years
  skills: string[];
  education: Education[];
  workExperience: WorkExperience[];
  status: CandidateStatus;
  source: string; // where they applied from
  resumeUrl?: string;
  coverLetter?: string;
  interviewNotes?: string;
  rating?: number; // 1-5 stars
  appliedDate: string;
  lastContactDate?: string;
  nextInterviewDate?: string;
  expectedSalary?: number;
  availabilityDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
}

export type CandidateStatus = 
  | 'applied'
  | 'screening'
  | 'phone_interview'
  | 'technical_interview'
  | 'on_site_interview'
  | 'final_interview'
  | 'offer_sent'
  | 'offer_accepted'
  | 'offer_declined'
  | 'rejected'
  | 'withdrawn';

export interface CreateCandidateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department?: string;
  experience: number;
  skills: string[];
  education: Omit<Education, 'id'>[];
  workExperience: Omit<WorkExperience, 'id'>[];
  source: string;
  resumeUrl?: string;
  coverLetter?: string;
  expectedSalary?: number;
  availabilityDate?: string;
}

export interface UpdateCandidateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  experience?: number;
  skills?: string[];
  education?: Education[];
  workExperience?: WorkExperience[];
  status?: CandidateStatus;
  interviewNotes?: string;
  rating?: number;
  nextInterviewDate?: string;
  expectedSalary?: number;
  availabilityDate?: string;
}

export interface CandidateListResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CandidateFilters {
  status?: CandidateStatus[];
  department?: string[];
  position?: string[];
  experience?: {
    min?: number;
    max?: number;
  };
  rating?: {
    min?: number;
    max?: number;
  };
  appliedDate?: {
    from?: string;
    to?: string;
  };
  search?: string;
}
