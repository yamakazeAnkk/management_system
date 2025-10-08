export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department?: string;
  experience: number;
  skills: string[];
  status: string;
  rating?: number;
  appliedDate: string;
  source: string;
}
