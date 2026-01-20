'use client';

import { Form, Input, Button, message, Card, Divider } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  HeartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import Image from "next/image";
import image from "../../public/images/med-cert-logo.jpg";
import Link from "next/link";

export default function LoginForm({ dict, lang }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= CAPTCHA ================= */
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 5; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(text);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);
  /* =========================================== */

  const handleLogin = async (values: { emailId: string; password: string }) => {
    if (!captchaInput || captchaInput !== captcha) {
      message.error("Invalid captcha");
      generateCaptcha();
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://192.168.31.12:3020/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorMsg("Invalid email or password");
        generateCaptcha();
        return;
      }

      const simplifiedRole =
        data?.user?.role === "admin" ? "admin" : "user";

      localStorage.setItem(
        "medCert",
        JSON.stringify({
          ...data.user,
          role: simplifiedRole,
          token: data.token
        })
      );

      setLoading(false);
      message.success(`${simplifiedRole.toUpperCase()} login successful!`);
      router.push(`/${lang}/${simplifiedRole}/dashboard`);
    } catch {
      setLoading(false);
      message.error("Server error");
      generateCaptcha();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '20px',
          border: 'none',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)'
        }}
        styles={{ body: { padding: '40px' } }}
      >

        {/* ===== CENTER LOGO ===== */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px"
        }}>
          <Link href="/">
            <Image src={image} alt="med-cert" width={200} height={40} />
          </Link>
        </div>

        <h2 style={{
          textAlign: "center",
          marginBottom: "8px",
          fontSize: "24px",
          fontWeight: 600
        }}>
          {dict.login.title}
        </h2>

        <p style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "14px",
          marginBottom: "32px"
        }}>
          {dict.login.subtitle}
        </p>

        <Form layout="vertical" onFinish={handleLogin}>
          {/* EMAIL */}
          <Form.Item
            name="emailId"
            label={dict.login.emailLabel}
            rules={[{ required: true, message: dict.login.emailRequired }]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder={dict.login.emailPlaceholder}
            />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            name="password"
            label={dict.login.passwordLabel}
            rules={[{ required: true, message: dict.login.passwordRequired }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder={dict.login.passwordPlaceholder}
              iconRender={(v) =>
                v ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* ===== CAPTCHA (50% / 50%) ===== */}
          <div style={{
            display: "flex",
            gap: "10px",
            marginBottom: "16px"
          }}>
            <div style={{
              flex: 1,
              padding: "12px",
              background: "#f1f5f9",
              borderRadius: "8px",
              fontWeight: 700,
              letterSpacing: "4px",
              textAlign: "center",
              fontSize: "16px"
            }}>
              {captcha}
            </div>

            <Input
              style={{ flex: 1 }}
              size="large"
              placeholder="Captcha"
              value={captchaInput}
              onChange={(e) =>
                setCaptchaInput(e.target.value.toUpperCase())
              }
            />

            <Button
              style={{marginTop: "9px"}}
              icon={<ReloadOutlined />}
              onClick={generateCaptcha}
            />
          </div>
          {/* ================================ */}

          {errorMsg && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              ⚠️ {dict.login.invalidCredentials}
            </div>
          )}

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            {loading ? dict.login.signingIn : dict.login.signIn}
          </Button>
        </Form>

        <Divider>{dict.login.or}</Divider>

        <p style={{ textAlign: "center" }}>
          {dict.login.noAccount}{" "}
          <Link href={`/${lang}/auth/signUp`}>
            {dict.login.createAccount}
          </Link>
        </p>

        {/* FOOTER ICONS */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          <HeartOutlined />
          <TeamOutlined />
          <SafetyCertificateOutlined />
        </div>

      </Card>
    </div>
  );
}
