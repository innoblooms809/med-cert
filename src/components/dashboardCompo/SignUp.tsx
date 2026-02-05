"use client";

import {useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, message, Row, Col, Card, Steps, Divider } from "antd";
import { UploadOutlined, UserOutlined, IdcardOutlined, FileTextOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function SignupPage({ dict, lang }: any) {
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any[]>([]);
  const [specialization, setSpecialization] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [subSpecialization, setSubSpecialization] = useState<any[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<number | null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [hospitals, setHospitals] = useState<any[]>([]);


  const [messageApi, contextHolder] = message.useMessage();

  // FETCH PROFILES FROM API 
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("http://localhost:3021/v1/profile/getActiveProfiles");
        if (!res.ok) {
          messageApi.error("Failed to load profiles");
          return;
        }

        const data = await res.json();
        setProfile(data.data);
        console.log(data.data, "profiles:::::::::;");

        // ✅ Set default profile and trigger specializations
        if (data.data && data.data.length > 0) {
          const defaultProfileId = data.data[0].id;
          form.setFieldsValue({ profileId: defaultProfileId });
          setSelectedProfile(defaultProfileId);
        }
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };

    fetchProfiles();
  }, []);

  // FETCH SPECIALIZATION FROM API

  useEffect(() => {
    //only fetch specializations if a profile is selected
    if (!selectedProfile) {
      setSpecialization([]);
      return;
    }
    const fetchSpecializations = async () => {
      try {
        const res = await fetch(`http://localhost:3021/v1/specializations/getActiveSpecializations?profileId=${selectedProfile}`);
        if (!res.ok) {
          messageApi.error("Failed to load specializations");
          return;
        }
        const data = await res.json();
        setSpecialization(data.data);
        console.log(data.data, "specializations:::::::::;");
      } catch (err) {
        console.error("Failed to fetch specializations:", err);
      }
    };

    fetchSpecializations();
  }, [selectedProfile]); // Re-fetch when selectedProfile changes

  // FETCH SUB-SPECIALIZATION FROM API
  useEffect(() => {
    //only fetch sub-specializations if a profile is selected
    if (!selectedProfile) {
      return;
    }
    const fetchSubSpecializations = async () => {
      try {
        // Only fetch if a specialization is selected
        if (!selectedSpecialization) {
          setSubSpecialization([]); // Clear subspecializations if no specialization
          return;
        }
        const res = await fetch(`http://localhost:3021/v1/subSpecializations/getActiveSubSpecializations?specializationId=${selectedSpecialization}`);
        if (!res.ok) {
          messageApi.error("Failed to load sub-specializations");
          return;
        }
        const data = await res.json();
        setSubSpecialization(data.data);
        console.log(data.data, "sub-specializations:::::::::;");
      } catch (err) {
        console.error("Failed to fetch sub-specializations:", err);
      }
    };

    fetchSubSpecializations();
  }, [selectedSpecialization]); // Re-fetch when selectedProfile changes

  // FETCH COUNTRY LIST FROM API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:3021/v1/country/getActiveCountries");
        if (!res.ok) {
          messageApi.error("Failed to load countries");
          return;
        }
        const data = await res.json();
        console.log(data.data, "countries:::::::::;");
        setCountries(data.data);
      }
      catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    fetchCountries();
  }, []);


  // FETCH HOSPITAL LIST FROM API - BASED ON SELECTED COUNTRY
  useEffect(() => {
    if (!selectedCountry) {
      setHospitals([]);
      return;
    }

    const fetchHospitals = async () => {
      try {
        const res = await fetch(`http://localhost:3021/v1/hospital/getActiveHospitals?countryId=${selectedCountry}`);
        if (!res.ok) {
          messageApi.error("Failed to load hospitals");
          return;
        }
        const data = await res.json();
        console.log(data.data, "hospitals:::::::::");
        setHospitals(data.data);
      }
      catch (err) {
        console.error("Failed to fetch hospitals:", err);
      }
    };

    fetchHospitals();
  }, [selectedCountry]);

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      
      // Add all form fields - MATCH THESE NAMES WITH YOUR BACKEND EXPECTATIONS
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("emailId", values.emailId); 
      formData.append("password", values.password);
      formData.append("profileId", values.profileId);
      formData.append("specializationId", values.specialization); // Try "specializationId" instead
      formData.append("subSpecializationId", values.subSpecialization); // Try "subSpecializationId" instead
      formData.append("experience", values.experience);
      formData.append("countryId", values.country); // Try "countryId" instead
      formData.append("hospitalId", values.hospital); // Try "hospitalId" instead
      formData.append("licenseNumber", values.licenseNumber);
      
      // Add file if uploaded - Handle both file object and file list
      if (values.license) {
        if (Array.isArray(values.license) && values.license.length > 0) {
          // If it's an array of file objects from Upload component
          const fileObj = values.license[0];
          if (fileObj.originFileObj) {
            formData.append("uploadLicense", fileObj.originFileObj);
          } else if (fileObj instanceof File) {
            formData.append("license", fileObj);
          }
        }
      }

      console.log("FormData being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Make API call to registration endpoint
      const res = await fetch("http://localhost:3021/v1/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific error messages from API
        if (data?.message?.toLowerCase().includes("already")) {
          messageApi.error("User already registered with this email");
        } else {
          messageApi.error(data?.message || "Registration failed");
        }
        return;
      }

      // Success message
      messageApi.success(data?.message || "Registration successful!");
      form.resetFields();

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        router.push(`/${lang}/auth/login`);
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      messageApi.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 px-4 py-12">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="bg-white shadow-2xl rounded-2xl border-0 overflow-hidden w-full max-w-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 px-8 py-10 -m-6 mb-8 text-white">
              <h2 className="text-4xl font-bold mb-2">Create Your Account</h2>
              <p className="text-amber-100 text-lg">Join Med-Cert and advance your medical career</p>
            </div>

            <Form form={form} layout="vertical" onFinish={handleFinish} className="px-8 pb-8">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <UserOutlined className="text-amber-600" />
                  Personal Information
                </h3>
                
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">{dict.signup.firstName}</span>}
                      name="firstName"
                      rules={[{ required: true, message: "First name is required" }]}
                    >
                      <Input 
                        size="large" 
                        placeholder="John"
                        className="rounded-lg border-gray-200 focus:border-amber-500"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">{dict.signup.lastName}</span>}
                      name="lastName"
                      rules={[{ required: true, message: "Last name is required" }]}
                    >
                      <Input 
                        size="large" 
                        placeholder="Doe"
                        className="rounded-lg border-gray-200 focus:border-amber-500"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={<span className="font-semibold text-gray-700">{dict.signup.email}</span>}
                  name="emailId"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Invalid email format" }
                  ]}
                >
                  <Input 
                    size="large" 
                    placeholder="john@example.com"
                    className="rounded-lg border-gray-200 focus:border-amber-500"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">{dict.signup.password}</span>}
                      name="password"
                      rules={[{ required: true, message: "Password is required" }]}
                    >
                      <Input.Password 
                        size="large"
                        placeholder="Enter a strong password"
                        className="rounded-lg border-gray-200"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">{dict.signup.confirmPassword}</span>}
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        { required: true, message: "Confirm password is required" },
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
                        size="large"
                        placeholder="Confirm password"
                        className="rounded-lg border-gray-200"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Divider className="my-8 bg-gray-200" />

              {/* Professional Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <IdcardOutlined className="text-orange-600" />
                  Professional Information
                </h3>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">{dict.signup.profile}</span>}
                      name="profileId"
                      rules={[{ required: true, message: "Profile is required" }]}
                      initialValue={profile.length > 0 ? profile[0].id : undefined}
                    >
                      <Select 
                        size="large"
                        onChange={(val) => {
                          setSelectedProfile(val);
                          form.setFieldsValue({ specialization: undefined });
                        }}
                        placeholder="Select your profile"
                        className="rounded-lg"
                      >
                        {profile.map((r) => (
                          <Option key={r.id} value={r.id}>
                            {r.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  {selectedProfile && (
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<span className="font-semibold text-gray-700">{dict.signup.specialization}</span>}
                        name="specialization"
                        rules={[{ required: true, message: "Specialization is required" }]}
                      >
                        <Select 
                          size="large"
                          placeholder="Select specialization" 
                          disabled={!selectedProfile} 
                          onChange={(val) => {
                            setSelectedSpecialization(val);
                            form.setFieldsValue({ subspecialization: undefined });
                          }}
                          className="rounded-lg"
                        >
                          {specialization.map((spec) => (
                            <Option key={spec.id} value={spec.id}>
                              {spec.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}

                  {selectedSpecialization && (
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<span className="font-semibold text-gray-700">{dict.signup.subSpecialization}</span>}
                        name="subSpecialization"
                        rules={[{ required: true, message: "Sub-specialization is required" }]}
                      >
                        <Select 
                          size="large"
                          placeholder="Select sub-specialization" 
                          disabled={!selectedSpecialization}
                          className="rounded-lg"
                        >
                          {subSpecialization.map((spec) => (
                            <Option key={spec.id} value={spec.id}>
                              {spec.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">Experience (Years)</span>}
                      name="experience"
                      rules={[{ required: true, message: "Experience is required" }]}
                    >
                      <Input 
                        type="number" 
                        size="large"
                        min={0} 
                        placeholder="e.g. 5"
                        className="rounded-lg border-gray-200"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">{dict.signup.country}</span>}
                      name="country"
                      rules={[{ required: true, message: "Country is required" }]}
                    >
                      <Select 
                        size="large"
                        placeholder="Select country"
                        className="rounded-lg"
                        onChange={(val) => {
                          setSelectedCountry(val);
                          form.setFieldsValue({ hospital: undefined });
                        }}
                      >
                        {countries.map((r) => (
                          <Option key={r.id} value={r.id}>
                            {r.countryName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  {selectedCountry && (
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<span className="font-semibold text-gray-700">{dict.signup.hospital}</span>}
                        name="hospital"
                        rules={[{ required: true, message: "Hospital is required" }]}
                      >
                        <Select 
                          size="large"
                          placeholder="Select hospital"
                          className="rounded-lg"
                          disabled={!selectedCountry}
                        >
                          {hospitals.map((r) => (
                            <Option key={r.id} value={r.id}>
                              {r.hospitalName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span className="font-semibold text-gray-700">License Number</span>}
                      name="licenseNumber"
                      rules={[{ required: true, message: "License number is required" }]}
                    >
                      <Input 
                        size="large"
                        placeholder="Enter license number"
                        className="rounded-lg border-gray-200"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Divider className="my-8 bg-gray-200" />

              {/* Documents */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileTextOutlined className="text-rose-600" />
                  Documents & Credentials
                </h3>

                <Form.Item
                  label={<span className="font-semibold text-gray-700">{dict.signup.uploadLicense}</span>}
                  name="uploadLicense"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please upload your license",
                      validator: (_, fileList) => {
                        if (fileList && fileList.length > 0) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Please upload your license"));
                      },
                    },
                  ]}
                  normalize={(value) => {
                    if (Array.isArray(value)) {
                      return value;
                    }
                    return value?.fileList || [];
                  }}
                >
                  <Upload 
                    beforeUpload={() => false} 
                    maxCount={1}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  >
                    <Button 
                      icon={<UploadOutlined />} 
                      size="large"
                      className="w-full border-2 border-dashed border-amber-300 text-amber-700 hover:border-amber-500 hover:text-amber-800 rounded-lg bg-amber-50 hover:bg-amber-100 transition-all"
                    >
                      {dict.signup.uploadLicenseBtn}
                    </Button>
                  </Upload>
                </Form.Item>
              </div>

              {/* Submit Button */}
              <Form.Item className="mb-0 mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  className="h-12 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 border-0 rounded-lg font-bold text-lg hover:shadow-xl transition-all text-white"
                >
                  {dict.signup.signUp}
                </Button>
              </Form.Item>

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-6">
                {dict.signup.alreadyHaveAccount}{" "}
                <Link
                  href={`/${lang}/auth/login`}
                  className="text-amber-600 font-semibold hover:text-amber-800 transition-colors"
                >
                  {dict.signup.login}
                </Link>
              </p>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}