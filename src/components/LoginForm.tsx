"use client";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
  role: "admin" | "user"; // you can extend roles if needed
}

export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`${role} login successful!`);

      // Save user info in localStorage
      localStorage.setItem(
        "dhaUser",
        JSON.stringify({
          name: values.username,
          email: `${values.username}@example.com`,
          role,
        })
      );

      // Redirect to dashboard based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user") {
        router.push("/user/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {role === "admin" ? "Admin Login" : "Facility Login"}
        </h2>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="bg-[#06C167]"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
