export interface User {
  id: string;
  employeeId: string; // EMP001, EMP002, etc.
  username: string;
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
  professionalInfo: ProfessionalInfo;
  emergencyContact: EmergencyContact;
  documents: UserDocuments;
  status: UserStatus;
  securitySettings: SecuritySettings;
  metadata: UserMetadata;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address: Address;
  avatarUrl?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface EmploymentInfo {
  departmentId?: string;
  position: string;
  jobTitle: string;
  managerId?: string;
  employmentType: 'full-time' | 'part-time' | 'contract';
  workLocation: string;
  joinDate: string;
  salary: Salary;
  benefits: string[];
  bonusEligible: boolean;
}

export interface Salary {
  amount: number;
  currency: string;
  type: 'monthly' | 'hourly' | 'annual';
  isConfidential: boolean;
}

export interface ProfessionalInfo {
  skills: string[];
  certifications: string[];
  education: Education[];
  languages: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface UserStatus {
  isActive: boolean;
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  lastActiveAt?: string;
}

export interface SecuritySettings {
  requireTwoFactor: boolean;
  passwordChangedAt?: string;
  lastLoginAt?: string;
  loginAttempts: number;
  lockedUntil?: string;
}

export interface UserDocuments {
  resume?: DocumentInfo;
  idDocument?: DocumentInfo;
  photo?: DocumentInfo;
  contracts: DocumentInfo[];
  certificates: DocumentInfo[];
  other: DocumentInfo[];
}

export interface DocumentInfo {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy?: string;
  description?: string;
  isActive: boolean;
}

export interface UserMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  employeeId: string;
  personalInfo: Omit<PersonalInfo, 'fullName'>;
  employmentInfo: EmploymentInfo;
  professionalInfo: ProfessionalInfo;
  emergencyContact: EmergencyContact;
  documents?: Partial<UserDocuments>;
  roleIds: string[];
}

export interface UpdateUserRequest {
  username?: string;
  personalInfo?: Partial<PersonalInfo>;
  employmentInfo?: Partial<EmploymentInfo>;
  professionalInfo?: Partial<ProfessionalInfo>;
  emergencyContact?: Partial<EmergencyContact>;
  documents?: Partial<UserDocuments>;
  status?: Partial<UserStatus>;
  roleIds?: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// Import types from other modules
import { Department } from './department';
import { Role } from './role';
