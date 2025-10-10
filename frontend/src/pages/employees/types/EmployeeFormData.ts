/**
 * Complete interface for Employee Form Data
 * Based on all form components in /add/ directory
 */

// Personal Information
export interface PersonalInfo {
  firstName: string;           // Required
  lastName: string;            // Required
  email: string;               // Required, email validation
  phone?: string;              // Optional
  dob?: string;                // Date of birth (YYYY-MM-DD)
  gender?: 'male' | 'female' | 'other' | 'prefer-not';
  address?: string;            // Full address textarea
}

// Employment Details
export interface EmploymentDetails {
  employeeId: string;          // Required (e.g., EMP001)
  jobTitle: string;            // Required
  department: 'engineering' | 'marketing' | 'sales' | 'hr' | 'finance'; // Required
  manager?: string;            // Optional - reporting manager ID
  startDate: string;           // Required (YYYY-MM-DD)
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern'; // Required
  location?: 'hq' | 'remote' | 'branch1' | 'branch2'; // Work location
  status: 'active' | 'inactive' | 'on-leave' | 'terminated'; // Default: 'active'
}

// Compensation & Benefits
export interface Compensation {
  salary: number;              // Required - base salary
  salaryType: 'annual' | 'monthly' | 'hourly'; // Default: 'annual'
  currency: 'usd' | 'eur' | 'gbp'; // Default: 'usd'
  bonusEligible: 'yes' | 'no'; // Default: 'yes'
  benefits: string[];          // Selected benefits from checkbox list
}

// Available Benefits Options
export const AVAILABLE_BENEFITS = [
  'Health Insurance',
  'Dental Insurance', 
  'Vision Insurance',
  '401(k) Plan',
  'Life Insurance',
  'Flexible PTO'
] as const;

// Emergency Contact
export interface EmergencyContact {
  name?: string;               // Contact full name
  relationship?: 'spouse' | 'parent' | 'sibling' | 'friend' | 'other';
  phone?: string;              // Phone number
  email?: string;              // Email address
}

// Additional Information
export interface AdditionalInfo {
  skills?: string[];           // Skills & expertise array
  notes?: string;              // Additional notes textarea
}

// Document Upload
export interface DocumentUploads {
  resume?: File[];             // Resume/CV files
  idDocument?: File[];         // ID document files
  photo?: File[];              // Photo files
}

// Complete Employee Form Data
export interface EmployeeFormData {
  // Form sections
  personalInfo: PersonalInfo;
  employmentDetails: EmploymentDetails;
  compensation: Compensation;
  emergencyContact: EmergencyContact;
  additionalInfo: AdditionalInfo;
  documents: DocumentUploads;
}

// Flat interface for form submission (all fields in one object)
export interface EmployeeFormDataFlat {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not';
  address?: string;
  
  // Employment Details
  employeeId: string;
  jobTitle: string;
  department: 'engineering' | 'marketing' | 'sales' | 'hr' | 'finance';
  manager?: string;
  startDate: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  location?: 'hq' | 'remote' | 'branch1' | 'branch2';
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  
  // Compensation
  salary: number;
  salaryType: 'annual' | 'monthly' | 'hourly';
  currency: 'usd' | 'eur' | 'gbp';
  bonusEligible: 'yes' | 'no';
  benefits: string[];
  
  // Emergency Contact
  name?: string;
  relationship?: 'spouse' | 'parent' | 'sibling' | 'friend' | 'other';
  phoneEmergency?: string;
  emailEmergency?: string;
  
  // Additional Info
  skills?: string[];
  notes?: string;
  
  // Documents
  resume?: File[];
  idDocument?: File[];
  photo?: File[];
}

// Form validation rules
export interface EmployeeFormValidation {
  required: string[];
  email: string[];
  date: string[];
  number: string[];
}

export const EMPLOYEE_FORM_VALIDATION: EmployeeFormValidation = {
  required: [
    'firstName',
    'lastName', 
    'email',
    'employeeId',
    'jobTitle',
    'department',
    'startDate',
    'employmentType',
    'salary'
  ],
  email: ['email'],
  date: ['dob', 'startDate'],
  number: ['salary']
};

// Department options for dropdown
export const DEPARTMENT_OPTIONS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Finance' }
] as const;

// Employment type options
export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'intern', label: 'Intern' }
] as const;

// Location options
export const LOCATION_OPTIONS = [
  { value: 'hq', label: 'Headquarters' },
  { value: 'remote', label: 'Remote' },
  { value: 'branch1', label: 'Branch Office 1' },
  { value: 'branch2', label: 'Branch Office 2' }
] as const;

// Gender options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not', label: 'Prefer not to say' }
] as const;

// Relationship options
export const RELATIONSHIP_OPTIONS = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'parent', label: 'Parent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'friend', label: 'Friend' },
  { value: 'other', label: 'Other' }
] as const;

// Status options
export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'terminated', label: 'Terminated' }
] as const;

// Salary type options
export const SALARY_TYPE_OPTIONS = [
  { value: 'annual', label: 'Annual' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'hourly', label: 'Hourly' }
] as const;

// Currency options
export const CURRENCY_OPTIONS = [
  { value: 'usd', label: 'USD - US Dollar' },
  { value: 'eur', label: 'EUR - Euro' },
  { value: 'gbp', label: 'GBP - British Pound' }
] as const;

// Bonus eligible options
export const BONUS_ELIGIBLE_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
] as const;

// Form sections for step-by-step forms
export const FORM_SECTIONS = [
  { key: 'personalInfo', title: 'Personal Information', icon: '👤' },
  { key: 'employmentDetails', title: 'Employment Details', icon: '💼' },
  { key: 'compensation', title: 'Compensation & Benefits', icon: '💰' },
  { key: 'emergencyContact', title: 'Emergency Contact', icon: '📞' },
  { key: 'additionalInfo', title: 'Additional Information', icon: '📝' },
  { key: 'documents', title: 'Document Upload', icon: '📄' }
] as const;
