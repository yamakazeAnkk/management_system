import {
  UserOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

export type EmployeeSeed = {
  avatar: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "Active" | "Inactive" | "On Leave" | "Terminated";
  joinDate: string;
  salary: number;
};

export const initialEmployeeData: EmployeeSeed[] = [
  {
    id: "EMP001",
    avatar: "JS",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 234 567 8901",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "2022-01-15",
    salary: 85000,
  },
  {
    id: "EMP002",
    avatar: "SJ",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 234 567 8902",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joinDate: "2021-08-20",
    salary: 75000,
  },
  {
    id: "EMP003",
    avatar: "MC",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 234 567 8903",
    department: "Engineering",
    position: "Frontend Developer",
    status: "On Leave",
    joinDate: "2023-03-10",
    salary: 70000,
  },
  {
    id: "EMP004",
    avatar: "LW",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    phone: "+1 234 567 8904",
    department: "Sales",
    position: "Sales Representative",
    status: "Active",
    joinDate: "2022-11-05",
    salary: 60000,
  },
  {
    id: "EMP005",
    avatar: "DB",
    name: "David Brown",
    email: "david.brown@company.com",
    phone: "+1 234 567 8905",
    department: "HR",
    position: "HR Specialist",
    status: "Active",
    joinDate: "2021-06-12",
    salary: 65000,
  },
];

export const statistics = [
  {
    title: "Total Employees",
    value: 247,

    icon: <TeamOutlined style={{ color: "rgb(37, 99, 235)", fontSize: 24 }} />,
    bg: "rgba(37,99,235,0.1)",
    color: "rgb(37, 99, 235)",
  },
  {
    title: "Active Employees",
    value: 231,
    icon: <UserOutlined style={{ color: "rgb(22, 163, 74)", fontSize: 24 }} />,
    color: "rgb(22, 163, 74)",
    bg: "rgba(22,163,74,0.1)", // bg-green-500/10
    textColor: "rgb(22, 163, 74)", // text-green-600
  },
  {
    title: "On Leave",
    value: 18,
    icon: (
      <UserDeleteOutlined style={{ color: "rgb(234, 88, 12)", fontSize: 24 }} />
    ),
    color: "rgb(234, 88, 12)", // text-orange-600
    bg: "rgba(234,88,12,0.1)", // bg-orange-500/10
    textColor: "rgb(234, 88, 12)", // text-orange-600
  },
  {
    title: "New Hires",
    value: 5,
    icon: (
      <UserAddOutlined style={{ color: "rgb(126, 34, 206)", fontSize: 24 }} />
    ),
    color: "rgb(126, 34, 206)", // text-purple-600
    bg: "rgba(168,85,247,0.1)", // bg-purple-500/10
    textColor: "rgb(126, 34, 206)", // text-purple-600
  },
];

// Detailed employee profiles for EmployeeProfilePage (mock)
export type EmployeeProfile = {
  id: string; // e.g., EMP001
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string; // human readable date
  status: "Active" | "Inactive" | "On Leave" | "Terminated";
  location: string;
  dateOfBirth: string;
  address: string;
  manager: string;
  employmentType: string;
  workLocation: string;
  salary: string; // formatted
  salaryType: string;
  bonusEligible: string;
  benefits: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  skills: string[];
  recentActivity: { date: string; action: string }[];
};

export const employeeProfiles: EmployeeProfile[] = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "Jan 15, 2023",
    status: "Active",
    location: "San Francisco, CA",
    dateOfBirth: "March 15, 1990",
    address: "123 Market Street, San Francisco, CA 94103",
    manager: "Sarah Wilson",
    employmentType: "Full-time",
    workLocation: "Headquarters",
    salary: "$120,000",
    salaryType: "Annual",
    bonusEligible: "Yes",
    benefits: [
      "Health Insurance",
      "401(k) Plan",
      "Dental Insurance",
      "Vision Insurance",
      "Flexible PTO",
    ],
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@email.com",
    },
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
    recentActivity: [
      { date: "2 hours ago", action: "Submitted timesheet for week 12" },
      { date: "1 day ago", action: "Completed performance review" },
      { date: "3 days ago", action: "Updated emergency contact information" },
      { date: "1 week ago", action: "Requested 3 days leave for April" },
    ],
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "Aug 20, 2021",
    status: "Active",
    location: "New York, NY",
    dateOfBirth: "July 2, 1988",
    address: "99 Madison Ave, New York, NY 10016",
    manager: "Michael Chen",
    employmentType: "Full-time",
    workLocation: "Headquarters",
    salary: "$95,000",
    salaryType: "Annual",
    bonusEligible: "Yes",
    benefits: [
      "Health Insurance",
      "401(k) Plan",
      "Dental Insurance",
      "Vision Insurance",
    ],
    emergencyContact: {
      name: "Tom Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 765-4321",
      email: "tom.j@email.com",
    },
    skills: ["Campaign Strategy", "SEO", "Analytics", "Content"],
    recentActivity: [
      { date: "6 hours ago", action: "Published Q1 campaign brief" },
      { date: "2 days ago", action: "Reviewed agency proposals" },
    ],
  },
  {
    id: "EMP003",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    position: "Frontend Developer",
    joinDate: "Mar 10, 2023",
    status: "On Leave",
    location: "Remote",
    dateOfBirth: "December 11, 1992",
    address: "Remote",
    manager: "John Smith",
    employmentType: "Full-time",
    workLocation: "Remote",
    salary: "$85,000",
    salaryType: "Annual",
    bonusEligible: "No",
    benefits: ["Health Insurance", "Dental Insurance"],
    emergencyContact: {
      name: "Kevin Chen",
      relationship: "Brother",
      phone: "+1 (555) 111-2222",
      email: "kevin.chen@email.com",
    },
    skills: ["React", "TypeScript", "Vite", "Ant Design"],
    recentActivity: [
      { date: "3 weeks ago", action: "Merged feature/dashboard branch" },
    ],
  },
  {
    id: "EMP004",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    phone: "+1 (555) 456-7890",
    department: "Sales",
    position: "Sales Representative",
    joinDate: "Nov 5, 2022",
    status: "Active",
    location: "Los Angeles, CA",
    dateOfBirth: "January 23, 1991",
    address: "456 Sunset Blvd, Los Angeles, CA 90028",
    manager: "David Brown",
    employmentType: "Full-time",
    workLocation: "Branch Office 1",
    salary: "$80,000",
    salaryType: "Annual",
    bonusEligible: "Yes",
    benefits: ["Health Insurance", "401(k) Plan"],
    emergencyContact: {
      name: "Amy Wang",
      relationship: "Sister",
      phone: "+1 (555) 321-9999",
      email: "amy.wang@email.com",
    },
    skills: ["Negotiation", "CRM", "Lead Gen"],
    recentActivity: [
      { date: "5 hours ago", action: "Closed deal with Acme Co." },
    ],
  },
  {
    id: "EMP005",
    name: "David Brown",
    email: "david.brown@company.com",
    phone: "+1 (555) 567-8901",
    department: "HR",
    position: "HR Specialist",
    joinDate: "Jun 12, 2021",
    status: "Active",
    location: "Austin, TX",
    dateOfBirth: "September 5, 1987",
    address: "100 Congress Ave, Austin, TX 78701",
    manager: "Sarah Johnson",
    employmentType: "Full-time",
    workLocation: "Headquarters",
    salary: "$78,000",
    salaryType: "Annual",
    bonusEligible: "No",
    benefits: ["Health Insurance", "401(k) Plan", "Flexible PTO"],
    emergencyContact: {
      name: "Mark Brown",
      relationship: "Brother",
      phone: "+1 (555) 555-1212",
      email: "mark.b@email.com",
    },
    skills: ["Recruiting", "Onboarding", "Policy"],
    recentActivity: [
      { date: "2 days ago", action: "Processed monthly payroll" },
    ],
  },
  {
    id: "EMP006",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 678-9012",
    department: "Engineering",
    position: "Backend Developer",
    joinDate: "Feb 14, 2022",
    status: "Active",
    location: "Seattle, WA",
    dateOfBirth: "May 30, 1993",
    address: "1st Ave, Seattle, WA 98101",
    manager: "John Smith",
    employmentType: "Full-time",
    workLocation: "Headquarters",
    salary: "$110,000",
    salaryType: "Annual",
    bonusEligible: "Yes",
    benefits: ["Health Insurance", "Dental Insurance", "Vision Insurance"],
    emergencyContact: {
      name: "Paul Davis",
      relationship: "Father",
      phone: "+1 (555) 777-8888",
      email: "paul.d@email.com",
    },
    skills: ["Go", "MongoDB", "Docker", "Kubernetes"],
    recentActivity: [
      { date: "3 days ago", action: "Rolled out service v1.2.0" },
    ],
  },
  {
    id: "EMP007",
    name: "Michael Lee",
    email: "michael.lee@company.com",
    phone: "+1 (555) 789-0123",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "Sep 1, 2020",
    status: "Active",
    location: "Boston, MA",
    dateOfBirth: "October 9, 1989",
    address: "200 Main St, Boston, MA 02108",
    manager: "Emily Davis",
    employmentType: "Full-time",
    workLocation: "Headquarters",
    salary: "$105,000",
    salaryType: "Annual",
    bonusEligible: "Yes",
    benefits: ["Health Insurance", "401(k) Plan"],
    emergencyContact: {
      name: "Linda Lee",
      relationship: "Mother",
      phone: "+1 (555) 999-0000",
      email: "linda.l@email.com",
    },
    skills: ["Forecasting", "Excel", "SQL"],
    recentActivity: [
      { date: "1 day ago", action: "Published Q2 budget summary" },
    ],
  },
  {
    id: "EMP008",
    name: "Olivia Martinez",
    email: "olivia.martinez@company.com",
    phone: "+1 (555) 890-1234",
    department: "Operations",
    position: "Operations Manager",
    joinDate: "Oct 10, 2019",
    status: "Inactive",
    location: "Chicago, IL",
    dateOfBirth: "April 18, 1985",
    address: "600 W Chicago Ave, Chicago, IL 60654",
    manager: "David Brown",
    employmentType: "Full-time",
    workLocation: "Branch Office 2",
    salary: "$112,000",
    salaryType: "Annual",
    bonusEligible: "No",
    benefits: ["Health Insurance"],
    emergencyContact: {
      name: "Carlos Martinez",
      relationship: "Husband",
      phone: "+1 (555) 333-4444",
      email: "carlos.m@email.com",
    },
    skills: ["Ops Planning", "Process", "Vendor Mgmt"],
    recentActivity: [
      { date: "2 months ago", action: "Transferred to inactive pool" },
    ],
  },
];
