
import { Card, Input, Select, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import React from "react";

const { Option } = Select;

const EmployeeFilter: React.FC = () => {
  return (
    <Card style={{ marginBottom: 18, border: '1px solid #e0e0e0' }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: 'nowrap' }}>
        <div style={{ position: "relative", flex: 1, minWidth: 240, maxWidth: 420 }}>
          <SearchOutlined
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#b0b0b0",
              fontSize: 16,
              zIndex: 1,
            }}
          />
          <Input placeholder="Search employees by name, ID, or email..." style={{ paddingLeft: 36, height: 32 }} />
        </div>
        <Select
          defaultValue="all-departments"
          size="middle"
          style={{ width: 180, height: 32 }}
        >
          <Option value="all-departments">All Departments</Option>
          <Option value="engineering">Engineering</Option>
          <Option value="marketing">Marketing</Option>
          <Option value="sales">Sales</Option>
          <Option value="hr">HR</Option>
          <Option value="finance">Finance</Option>
        </Select>
        <Select
          defaultValue="all-positions"
          size="middle"
          style={{ width: 180, height: 32 }}
        >
          <Option value="all-positions">All Positions</Option>
          <Option value="developer">Developer</Option>
          <Option value="manager">Manager</Option>
          <Option value="analyst">Analyst</Option>
        </Select>
        <Select
          defaultValue="all-status"
          size="middle"
          style={{ width: 160, height: 32 }}
        >
          <Option value="all-status">All Status</Option>
          <Option value="active">Active</Option>
          <Option value="on-leave">On Leave</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <Button size="middle" icon={<FilterOutlined />}>Filter</Button>
      </div>
    </Card>
  );
};

export default EmployeeFilter;