export interface CandidateEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
}

export interface CandidateWorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface CandidateDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department?: string;
  experience: number;
  skills: string[];
  education: CandidateEducation[];
  workExperience: CandidateWorkExperience[];
  status: string;
  source: string;
  rating?: number;
  appliedDate: string;
  lastContactDate?: string;
  nextInterviewDate?: string;
  expectedSalary?: number;
  availabilityDate?: string;
  interviewNotes?: string;
  coverLetter?: string;
}
