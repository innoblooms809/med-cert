'use client';

import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { medcertusers, MedCertUsers } from "@/utils/userdata/medcertusers";
import styles from "@/components/Login.module.css"; // your CSS

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMsg("");

    const user: MedCertUsers | undefined = medcertusers.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!user) {
      setLoading(false);
      setErrorMsg("Invalid email or password");
      return;
    }

    const simplifiedRole = user.role === "admin" ? "admin" : "user";
    localStorage.setItem("medCert", JSON.stringify({ ...user, role: simplifiedRole }));

    setTimeout(() => {
      setLoading(false);
      message.success(`${simplifiedRole.toUpperCase()} login successful!`);
      router.push(`/${simplifiedRole}/dashboard`);
    }, 500);
  };

  return (
    <div className={`${styles.container} bg-gradient-to-br from-gray-100 to-blue-100`}>
      <div className={`${styles.loginCard} shadow-xl md:flex`}>
        {/* Illustration Section */}
        <div className={`${styles.illustration} hidden md:flex`}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.illustrationContent}>
            <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
            <p className="text-sm opacity-90 mb-8">Continue your medical learning journey with us</p>
            <div className={styles.medicalIcon}>
              <svg viewBox="0 0 24 24" width="80" height="80">
                <path fill="#4e73df" d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={`${styles.formSection} flex justify-center items-center`}>
          <div className={styles.formContainer}>
            <h2 className={`${styles.title} text-2xl md:text-3xl`}>Log In</h2>
            <p className={styles.subtitle}>Enter your credentials to access your account</p>

            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Enter your email" className={styles.input} />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password placeholder="Enter your password" className={styles.input} />
              </Form.Item>

              {errorMsg && <div className="text-red-600 text-center mb-2">{errorMsg}</div>}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className={`${styles.button} ${loading ? styles.loading : ""} text-white`}
                >
                  {loading ? <span className={styles.spinner}></span> : "Login"}
                </Button>
              </Form.Item>
            </Form>

            <p className={styles.signupText}>
              Don't have an account? <a href="/signup" className={styles.signupLink}>Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
