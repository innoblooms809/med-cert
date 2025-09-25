"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { UploadOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function Profile() {
  const router = useRouter();
  const { lang } = useParams();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("medCert");
    if (!storedUser) {
      router.push(`/${lang}/auth/login`);
      return;
    }

    const userObj = JSON.parse(storedUser);
    setUser(userObj);
    setDraft(userObj);
    setAvatarPreview(userObj.profileImage || null);
    setLicensePreview(userObj.license || null);
  }, [router, lang]);


  const saveUserToStorage = (u: any) => {
    const users = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const idx = users.findIndex((x: any) => x.email === u.email);
    if (idx >= 0) users[idx] = u;
    else users.push(u);
    localStorage.setItem("registered_users", JSON.stringify(users));
  };

  const fileToBase64 = (file: File) =>
    new Promise<string | null>((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const handleSave = async () => {
    const u = { ...draft };

    if (u.profileImage && u.profileImage instanceof File) {
      u.profileImage = await fileToBase64(u.profileImage);
    }
    if (u.license && u.license instanceof File) {
      u.license = await fileToBase64(u.license);
    }

    setUser(u);
    saveUserToStorage(u);
    localStorage.setItem("current_user", u.email);
    setEditing(false);
    message.success("Profile saved");
  };

  const handleLogout = () => {
  localStorage.removeItem("current_user");
  localStorage.removeItem("role");
  router.push(`/${lang}/auth/login`);
};


  if (!user) return null;

  return (
    <Row gutter={16} style={{ padding: 24 }}>
      {/* Left Column */}
      <Col span={8}>
        <Card
          actions={[
            user.role !== "admin" && (
              <Button type="primary" onClick={() => router.push("/mycourses")}>
                My Courses
              </Button>
            ),
            <Button icon={<EditOutlined />} onClick={() => setEditing(true)}>
              Edit Profile
            </Button>,
          ]}
        >
          <div style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              src={
                avatarPreview ||
                "https://www.shutterstock.com/image-photo/smiling-young-arab-man-doctor-600nw-2469373731.jpg"
              }
            />
            <Title level={4} style={{ marginTop: 12 }}>
              {user.firstName} {user.lastName}
            </Title>
            <Text type="secondary">
              {user.role === "admin" ? "Administrator" : user.specialization}
            </Text>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </div>
          </div>
          {user.role !== "admin" && (
            <Row gutter={16} style={{ marginTop: 16, textAlign: "center" }}>
              <Col span={8}>
                <Title level={5}>{user.stats?.enrolledCourses ?? 0}</Title>
                <Text>Enrolled</Text>
              </Col>
              <Col span={8}>
                <Title level={5}>{user.stats?.lecturesWatched ?? 0}</Title>
                <Text>Watched</Text>
              </Col>
              <Col span={8}>
                <Title level={5}>{user.stats?.submissions ?? 0}</Title>
                <Text>Submissions</Text>
              </Col>
            </Row>
          )}
        </Card>

        {user.role !== "admin" && (
          <Card style={{ marginTop: 16 }} title="Medical License">
            {licensePreview ? (
              <>
                <img
                  src={licensePreview}
                  alt="license"
                  style={{ width: "100%", borderRadius: 6 }}
                />
                <div style={{ marginTop: 8 }}>
                  <a href={user.license} download={`${user.email}-license.png`}>
                    Download License
                  </a>
                </div>
              </>
            ) : (
              <Text type="secondary">No license uploaded</Text>
            )}
          </Card>
        )}
      </Col>

      {/* Right Column */}
      <Col span={16}>
        <Card
          title="Account Information"
          extra={
            <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          }
        >
          {!editing ? (
            <>
              <p>
                <b>Full Name:</b> {user.firstName} {user.lastName}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Role:</b> {user.role}
              </p>
              {user.role !== "admin" && (
                <p>
                  <b>Specialization:</b> {user.specialization}
                </p>
              )}
              <Divider />
              <p>
                <b>Password:</b> ********
              </p>
            </>
          ) : (
            <Form layout="vertical">
              <Form.Item label="First Name">
                <Input
                  value={draft.firstName}
                  onChange={(e) =>
                    setDraft({ ...draft, firstName: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input
                  value={draft.lastName}
                  onChange={(e) =>
                    setDraft({ ...draft, lastName: e.target.value })
                  }
                />
              </Form.Item>
              {user.role !== "admin" && (
                <Form.Item label="Specialization">
                  <Input
                    value={draft.specialization}
                    onChange={(e) =>
                      setDraft({ ...draft, specialization: e.target.value })
                    }
                  />
                </Form.Item>
              )}
              <Form.Item label="Profile Image">
                <Upload
                  beforeUpload={(file) => {
                    setDraft({ ...draft, profileImage: file });
                    setAvatarPreview(URL.createObjectURL(file));
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </Form.Item>
              {user.role !== "admin" && (
                <Form.Item label="License">
                  <Upload
                    beforeUpload={(file) => {
                      setDraft({ ...draft, license: file });
                      setLicensePreview(URL.createObjectURL(file));
                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Upload License</Button>
                  </Upload>
                </Form.Item>
              )}
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Form>
          )}
        </Card>

        <Card title="About" style={{ marginTop: 16 }}>
          <Text>
            {user.bio || "Add a short bio about yourself from edit profile."}
          </Text>
        </Card>
      </Col>
    </Row>
  );
}

export default Profile;
