
import { useState } from "react"
import {
  Table,
  Card,
  Typography,
  Input,
  Button,
  Space,
  Tag,
  Avatar,
  Dropdown,
  Modal,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
} from "antd"
import type { ColumnsType, TableProps } from "antd/es/table"
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"


const { Title } = Typography
const { Search } = Input
const { Option } = Select

interface Employee {
  key: string
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  status: "Active" | "Inactive" | "On Leave"
  joinDate: string
  salary: number
  avatar?: string
}

type NewEmployeeFormValues = {
  name: string
  email: string
  phone: string
  department: string
  position: string
  joinDate: dayjs.Dayjs
}

export function AllEmployeesPage() {
  const [searchText, setSearchText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm<NewEmployeeFormValues>()

  // Sample employee data
  const initialEmployeeData: Employee[] = [
    {
      key: "1",
      id: "EMP001",
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
      key: "2",
      id: "EMP002",
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
      key: "3",
      id: "EMP003",
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
      key: "4",
      id: "EMP004",
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
      key: "5",
      id: "EMP005",
      name: "David Brown",
      email: "david.brown@company.com",
      phone: "+1 234 567 8905",
      department: "HR",
      position: "HR Specialist",
      status: "Active",
      joinDate: "2021-06-12",
      salary: 65000,
    },
  ]

  const [employees, setEmployees] = useState<Employee[]>(initialEmployeeData)

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "#52c41a"
      case "Inactive":
        return "#f5222d"
      case "On Leave":
        return "#fa8c16"
      default:
        return "#d9d9d9"
    }
  }

  const columns: ColumnsType<Employee> = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Employee) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: "bold" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{record.id}</div>
          </div>
        </Space>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()) ||
        record.id.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: unknown, record: Employee) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
            <MailOutlined style={{ marginRight: "8px", color: "#666" }} />
            <span style={{ fontSize: "12px" }}>{record.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PhoneOutlined style={{ marginRight: "8px", color: "#666" }} />
            <span style={{ fontSize: "12px" }}>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "Marketing", value: "Marketing" },
        { text: "Sales", value: "Sales" },
        { text: "HR", value: "HR" },
        { text: "Finance", value: "Finance" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Employee["status"]) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "On Leave", value: "On Leave" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit Employee",
                icon: <EditOutlined />,
              },
              {
                key: "delete",
                label: "Delete Employee",
                icon: <DeleteOutlined />,
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSubmit = (values: NewEmployeeFormValues) => {
    // Generate a new unique key and id
    const newKey = (employees.length + 1).toString()
    const newId = `EMP${(employees.length + 1).toString().padStart(3, "0")}`
    const newEmployee: Employee = {
      key: newKey,
      id: newId,
      name: values.name,
      email: values.email,
      phone: values.phone,
      department: values.department,
      position: values.position,
      status: "Active",
      joinDate: values.joinDate.format("YYYY-MM-DD"),
      salary: 0,
    }
    setEmployees((prev) => [...prev, newEmployee])
    setIsModalVisible(false)
    form.resetFields()
  }

  const tableProps: TableProps<Employee> = {
    columns,
    dataSource: employees,
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employees`,
    },
    scroll: { x: 1000 },
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <Title level={1} style={{ marginBottom: "24px", color: "#262626" }}>
        All Employees
      </Title>

      {/* Summary Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Employees"
              value={employees.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Active Employees"
              value={employees.filter((emp) => emp.status === "Active").length}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="On Leave"
              value={employees.filter((emp) => emp.status === "On Leave").length}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Employee Table */}
      <Card>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Search
            placeholder="Search employees..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            style={{ maxWidth: "400px" }}
          />
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showModal}>
            Add Employee
          </Button>
        </div>

        <Table {...tableProps} />
      </Card>

      {/* Add Employee Modal */}
      <Modal title="Add New Employee" open={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter full name" }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: "Please select department" }]}
              >
                <Select placeholder="Select department">
                  <Option value="Engineering">Engineering</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Sales">Sales</Option>
                  <Option value="HR">HR</Option>
                  <Option value="Finance">Finance</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: "Please enter position" }]}
              >
                <Input placeholder="Enter position" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="joinDate"
                label="Join Date"
                rules={[{ required: true, message: "Please select join date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Employee
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
