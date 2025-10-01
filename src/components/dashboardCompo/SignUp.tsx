"use client";

import { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Row, Col } from "antd"; // ✅ add this

const { Option } = Select;


export default function SignupPage({ dict, lang}: any) {
  const [form] = Form.useForm();
  const [role, setRole] = useState<string>("doctor");

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

  const handleFinish = (values: any) => {
    console.log("Form Values:", values);
    message.success(dict.signup.successMessage);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {dict.signup.createAccount}
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ role: "doctor" }}
        >
          {/* First & Last Name in one row */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.firstName}
                name="firstName"
                rules={[
                  { required: true, message: dict.signup.requiredFirstName },
                ]}
              >
                <Input placeholder={dict.signup.firstNamePlaceholder} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.lastName}
                name="lastName"
                rules={[
                  { required: true, message: dict.signup.requiredLastName },
                ]}
              >
                <Input placeholder={dict.signup.lastNamePlaceholder} />
              </Form.Item>
            </Col>
          </Row>

          {/* Email */}
          <Form.Item
            label={dict.signup.email}
            name="email"
            rules={[
              { required: true, message: dict.signup.requiredEmail },
              { type: "email", message: dict.signup.validEmail },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          {/* Password & Confirm Password side by side */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.password}
                name="password"
                rules={[
                  { required: true, message: dict.signup.requiredPassword },
                ]}
                hasFeedback
              >
                <Input.Password placeholder={dict.signup.passwordPlaceholder} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.confirmPassword}
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: dict.signup.requiredConfirmPassword,
                  },
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
                <Input.Password
                  placeholder={dict.signup.confirmPasswordPlaceholder}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Role & Specialization side by side */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.role}
                name="role"
                rules={[{ required: true, message: dict.signup.requiredRole }]}
              >
                <Select onChange={(val) => setRole(val)}>
                  <Option value="doctor">{dict.signup.doctor}</Option>
                  <Option value="nurse">{dict.signup.nurse}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.specialization}
                name="specialization"
                rules={[
                  {
                    required: true,
                    message: dict.signup.requiredSpecialization,
                  },
                ]}
              >
                <Select placeholder={dict.signup.specializationPlaceholder}>
                  {(role === "doctor"
                    ? doctorSpecializations
                    : nurseSpecializations
                  ).map((spec) => (
                    <Option key={spec} value={spec}>
                      {spec}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Upload License + Hospital Name side by side */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label={dict.signup.uploadLicense}
                name="license"
                rules={[
                  { required: true, message: dict.signup.requiredLicense },
                ]}
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
                rules={[
                  { required: true, message: dict.signup.requiredHospital },
                ]}
              >
                <Input placeholder={dict.signup.hospitalPlaceholder} />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {dict.signup.signUp}
            </Button>
          </Form.Item>
        </Form>

        {/* Already have account */}
        <p className="text-center text-sm mt-4">
          {dict.signup.alreadyHaveAccount}{" "}
          <Link href={`/${lang}/auth/login`} className="text-blue-600 hover:underline">
            {dict.signup.login}
          </Link>
        </p>
      </div>
    </div>
  );
}
