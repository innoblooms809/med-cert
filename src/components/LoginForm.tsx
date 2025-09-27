'use client';

import { Form, Input, Button, message, Card, Divider } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { medcertusers, MedCertUsers } from "@/utils/userdata/medcertusers";
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  HeartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined
} from "@ant-design/icons";

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animation Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-5%',
        right: '-5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '20px',
          border: 'none',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden'
        }}
        styles={{body:{padding: '40px'} }}
      >
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <SafetyCertificateOutlined style={{ fontSize: '28px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MedCert
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Medical Certification Platform</p>
            </div>
          </div>

          <h2 style={{
            margin: '16px 0 8px 0',
            fontSize: '24px',
            fontWeight: 600,
            color: '#1e293b'
          }}>
            Welcome Back
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            Sign in to continue your medical learning journey
          </p>
        </div>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            label={<span style={{ fontWeight: 600, color: '#374151' }}>Email Address</span>}
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input 
              placeholder="Enter your email address"
              prefix={<UserOutlined style={{ color: '#9ca3af' }} />}
              size="large"
              style={{
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4f46e5';
                e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontWeight: 600, color: '#374151' }}>Password</span>}
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password 
              placeholder="Enter your password"
              prefix={<LockOutlined style={{ color: '#9ca3af' }} />}
              size="large"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4f46e5';
                e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Form.Item>

          {errorMsg && (
            <div style={{
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid #fecaca',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <Form.Item style={{ marginBottom: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                height: '48px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ color: '#9ca3af', fontSize: '12px' }}>or</Divider>

        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            Don't have an account?{' '}
            <a 
              href="/signup" 
              style={{
                color: '#4f46e5',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#7c3aed';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4f46e5';
              }}
            >
              Create account
            </a>
          </p>
        </div>

        {/* Features Footer */}
        <div style={{ 
          marginTop: '32px', 
          padding: '16px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <HeartOutlined style={{ color: '#ef4444', fontSize: '16px' }} />
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Medical</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <TeamOutlined style={{ color: '#10b981', fontSize: '16px' }} />
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Certified</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <SafetyCertificateOutlined style={{ color: '#f59e0b', fontSize: '16px' }} />
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Secure</div>
          </div>
        </div>
      </Card>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .ant-card {
          border-radius: 20px !important;
        }
        
        .ant-form-item-label > label {
          font-weight: 600 !important;
        }
        
        .ant-input:focus, .ant-input-focused {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
        }
        
        .ant-btn-primary:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4) !important;
        }
      `}</style>
    </div>
  );
}