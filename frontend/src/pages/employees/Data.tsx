import { UserOutlined, TeamOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";

export type EmployeeSeed = {
  avatar: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "Active" | "Inactive" | "On Leave";
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
        icon:<UserDeleteOutlined style={{ color: "rgb(234, 88, 12)", fontSize: 24 }} />,
        color: "rgb(234, 88, 12)", // text-orange-600
        bg: "rgba(234,88,12,0.1)", // bg-orange-500/10
        textColor: "rgb(234, 88, 12)", // text-orange-600
  },
  {
    title: "New Hires",
    value: 5,
    icon: <UserAddOutlined style={{ color: "rgb(126, 34, 206)", fontSize: 24 }} />,
    color: "rgb(126, 34, 206)", // text-purple-600
    bg: "rgba(168,85,247,0.1)", // bg-purple-500/10
    textColor: "rgb(126, 34, 206)", // text-purple-600
  },
];
