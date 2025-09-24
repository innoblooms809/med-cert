"use client";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { medcertusers, MedCertUsers } from "@/utils/userdata/medcertusers";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMsg("");

    // Find user from medcertusers
    const user: MedCertUsers | undefined = medcertusers.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!user) {
      setLoading(false);
      setErrorMsg("Invalid email or password");
      return;
    }

    // Simplify role: admin stays admin, others become user
    const simplifiedRole = user.role === "admin" ? "admin" : "user";

    // Save user in localStorage
    localStorage.setItem(
      "medCert",
      JSON.stringify({ ...user, role: simplifiedRole })
    );

    setTimeout(() => {
      setLoading(false);
      message.success(`${simplifiedRole.toUpperCase()} login successful!`);

      // Redirect based on simplified role
      router.push(`/${simplifiedRole}/dashboard`);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login
        </h2>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {errorMsg && (
            <div className="text-red-600 text-center mb-2">{errorMsg}</div>
          )}

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
