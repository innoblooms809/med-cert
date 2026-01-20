"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function SignupPage({ dict, lang }: any) {
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<number | null>(null);
  const [roles, setRoles] = useState<any[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  /* ---------- Specializations ---------- */
  const doctorSpecializations = [
    dict.signup.specializations.cardiologist,
    dict.signup.specializations.dermatologist,
    dict.signup.specializations.gynecologist,
    dict.signup.specializations.pediatrician,
    dict.signup.specializations.orthopedic,
    dict.signup.specializations.neurologist,
  ];

  const nurseSpecializations = [
    dict.signup.specializations.surgicalNurse,
    dict.signup.specializations.icuNurse,
    dict.signup.specializations.pediatricNurse,
    dict.signup.specializations.erNurse,
    dict.signup.specializations.oncologyNurse,
  ];

  const technicianSpecializations = [
    dict.signup.specializations.radiologyTechnician,
    dict.signup.specializations.laboratoryTechnician,
    dict.signup.specializations.pharmacyTechnician,
    dict.signup.specializations.cardiologyTechnician,
    dict.signup.specializations.surgicalTechnician,
  ];

  /* ---------- FETCH ROLES FROM API ---------- */
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(
          "http://192.168.31.12:3020/v1/profile/getProfiles"
        );
        const data = await res.json();

        if (!res.ok || data?.error) {
          messageApi.error("Failed to load roles");
          return;
        }

        setRoles(data.data);

        if (data.data.length > 0) {
          form.setFieldsValue({ roleId: data.data[0].id });
          setRole(data.data[0].id);
        }
      } catch (err) {
        messageApi.error("Role API error / CORS issue");
      }
    };

    fetchRoles();
  }, []);

  /* ---------- REGISTER ---------- */
  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("emailId", values.emailId);
      formData.append("password", values.password);
      formData.append("roleId", values.roleId);
      formData.append("specialization", values.specialization);
      formData.append("hospital", values.hospital);

      if (values.license?.length > 0) {
        formData.append("license", values.license[0].originFileObj);
      }

      const res = await fetch(
        "http://192.168.31.12:3020/v1/user/register",
        {
          method: "POST",
          body: formData,
        }
      );

      let data: any = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        if (data?.message?.toLowerCase().includes("already")) {
          messageApi.error("User already registered with this email");
        } else {
          messageApi.error(data?.message || "Registration failed");
        }
        return;
      }

      messageApi.success(data?.message || "Registration successful 🎉");
      form.resetFields();

      setTimeout(() => {
        router.push(`/${lang}/auth/login`);
      }, 1500);
    } catch (err) {
      messageApi.error("Server error / CORS issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            {dict.signup.createAccount}
          </h2>

          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.firstName}
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.lastName}
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={dict.signup.email}
              name="emailId"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.password}
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.confirmPassword}
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(dict.signup.passwordMismatch)
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.role}
                  name="roleId"
                  rules={[{ required: true }]}
                >
                  <Select onChange={(val) => setRole(val)}>
                    {roles.map((r) => (
                      <Option key={r.id} value={r.id}>
                        {r.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.specialization}
                  name="specialization"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {(role === 1
                      ? doctorSpecializations
                      : role === 2
                      ? nurseSpecializations
                      : technicianSpecializations
                    ).map((spec) => (
                      <Option key={spec} value={spec}>
                        {spec}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.uploadLicense}
                  name="license"
                  rules={[{ required: true }]}
                >
                  <Upload beforeUpload={() => false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>
                      {dict.signup.uploadLicenseBtn}
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={dict.signup.hospital}
                  name="hospital"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                {dict.signup.signUp}
              </Button>
            </Form.Item>
          </Form>

          <p className="text-center text-sm mt-4">
            {dict.signup.alreadyHaveAccount}{" "}
            <Link
              href={`/${lang}/auth/login`}
              className="text-blue-600 hover:underline"
            >
              {dict.signup.login}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
