"use client";

import React, { useState } from "react";
import { Form, Input, Select, Checkbox, Button, Table, Space, Tag, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/reset.css"; // Import Ant Design styles

const { Option } = Select;

interface User {
  id: string;
  name: string;
  role: "Doctor" | "Nurse";
  specialization: string;
  register: string;
  subscription: "Free" | "Monthly" | "Yearly" | "Premium";
  certificate: boolean;
  hospital: string;
}

const DEMO_ROWS: User[] = [
  {
    id: "d-1001",
    name: "Dr. Ahmed Al Mansoori",
    role: "Doctor",
    specialization: "Cardiology",
    register: "REG-2025-001",
    subscription: "Premium",
    certificate: true,
    hospital: "City General Hospital",
  },
  {
    id: "n-2001",
    name: "Nurse Mariam Al Suwaidi",
    role: "Nurse",
    specialization: "Pediatric Care",
    register: "NUR-2025-010",
    subscription: "Monthly",
    certificate: false,
    hospital: "City General Hospital",
  },
];

const SPECIALIZATIONS = {
  Doctor: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Dermatology", "General Medicine"],
  Nurse: ["Pediatric Care", "Emergency Care", "Surgical Assistance", "Intensive Care", "Geriatric Care", "Maternity Care"],
};

export default function Users() {
  const [rows, setRows] = useState<User[]>(DEMO_ROWS);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const role = form.getFieldValue("role") as "Doctor" | "Nurse";


  const onFinish = (values: any) => {
    if (editingUser) {
      // Save edit
      setRows((prev) =>
        prev.map((row) => (row.id === editingUser.id ? { ...editingUser, ...values } : row))
      );
      setEditingUser(null);
    } else {
      // Add new user
      const newUser: User = { id: Date.now().toString(), ...values };
      setRows((prev) => [newUser, ...prev]);
    }
    form.resetFields();
  };

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const columns: ColumnsType<User> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Specialization", dataIndex: "specialization", key: "specialization" },
    { title: "User Registered", dataIndex: "register", key: "register" },
    { title: "User Subscription", dataIndex: "subscription", key: "subscription" },
    {
      title: "Certificate",
      dataIndex: "certificate",
      key: "certificate",
      render: (val) => <Tag color={val ? "green" : "red"}>{val ? "Yes" : "No"}</Tag>,
    },
    { title: "Hospital", dataIndex: "hospital", key: "hospital" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>{editingUser ? "Edit User" : "User Registration"}</h2>
      <Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  style={{
    marginBottom: 24,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  }}
>
  <Form.Item
    name="name"
    label="Name"
    rules={[{ required: true, message: "Name is required" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    name="role"
    label="Role"
    rules={[{ required: true, message: "Role is required" }]}
  >
    <Select
      onChange={(val) => {
        form.setFieldsValue({ specialization: "" });
      }}
    >
      <Option value="Doctor">Doctor</Option>
      <Option value="Nurse">Nurse</Option>
    </Select>
  </Form.Item>

  <Form.Item
    name="specialization"
    label="Specialization"
    rules={[{ required: true, message: "Specialization is required" }]}
  >
    <Select>
      {(SPECIALIZATIONS[role] || []).map((spec: any) => (
        <Option key={spec} value={spec}>
          {spec}
        </Option>
      ))}
    </Select>
  </Form.Item>

  <Form.Item
    name="register"
    label="User Registered"
    rules={[{ required: true, message: "User Registration is required" }]}
  >
    <Input />
  </Form.Item>

  <Form.Item name="subscription" label="User Subscription" initialValue="Free">
    <Select>
      <Option value="Free">Free</Option>
      <Option value="Monthly">Monthly</Option>
      <Option value="Yearly">Yearly</Option>
      <Option value="Premium">Premium</Option>
    </Select>
  </Form.Item>

  <Form.Item name="certificate" valuePropName="checked">
    <Checkbox>Has Certificate</Checkbox>
  </Form.Item>

  <Form.Item
    name="hospital"
    label="Hospital"
    rules={[{ required: true, message: "Hospital is required" }]}
  >
    <Input />
  </Form.Item>

  {/* Submit buttons span both columns */}
  <Form.Item style={{ gridColumn: "span 2" }}>
    <Button type="primary" htmlType="submit">
      {editingUser ? "Save Changes" : "Register User"}
    </Button>
    {editingUser && (
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => {
          form.resetFields();
          setEditingUser(null);
        }}
      >
        Cancel
      </Button>
    )}
  </Form.Item>
</Form>


      <h2>Registered Users ({rows.length})</h2>
      <Table columns={columns} dataSource={rows} rowKey="id" />
    </div>
  );
}
