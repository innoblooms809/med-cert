"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Input,
  Typography,
  Row,
  Col,
  message,
  Space,
  Tabs,
  Modal,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";

const { Title, Text } = Typography;

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [draft, setDraft] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [bioModalOpen, setBioModalOpen] = useState(false);

  useEffect(() => {
  const currentEmail = localStorage.getItem("current_user");

  const users = JSON.parse(localStorage.getItem("registered_users") || "[]");
  const found = currentEmail
    ? users.find((u: any) => u.email === currentEmail)
    : null;

  if (found) {
    setUser(found);
    setDraft(found);
    setAvatarPreview(found.profileImage || null);
    setLicensePreview(found.license || null);
  } else {
    const fallbackEmail = currentEmail || "guest@example.com";
    const fallback = {
      firstName: fallbackEmail?.split?.("@")?.[0] || "User",
      lastName: "",
      email: fallbackEmail,
      specialization: "General",
      profileImage: null,
      license: null,
      createdAt: new Date().toISOString(),
      bio: "",
      stats: { enrolledCourses: 0, lecturesWatched: 0, submissions: 0 },
    };
    setUser(fallback);
    setDraft(fallback);
  }
}, []);


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

  const handleStartEdit = () => {
    setDraft(user);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft(user);
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (name === "profileImage") setAvatarPreview(URL.createObjectURL(file));
      if (name === "license") setLicensePreview(URL.createObjectURL(file));
      setDraft({ ...draft, [name]: file });
    } else {
      setDraft({ ...draft, [name]: value });
    }
  };

  const handleSave = async () => {
    const u = { ...draft };
    if (u.profileImage instanceof File)
      u.profileImage = await fileToBase64(u.profileImage);
    if (u.license instanceof File)
      u.license = await fileToBase64(u.license);

    setUser(u);
    saveUserToStorage(u);
    localStorage.setItem("current_user", u.email);
    setEditing(false);
    message.success("Profile saved!");
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    router.push("/login");
  };

  const handleBioSave = (newBio: string) => {
    const updated = { ...user, bio: newBio };
    setUser(updated);
    saveUserToStorage(updated);
    setBioModalOpen(false);
    message.success("Bio updated!");
  };

  if (!user) return null;

  // Dummy weekly activity data
  const weeklyData = [
    { day: "Mon", lectures: 3, submissions: 1 },
    { day: "Tue", lectures: 2, submissions: 2 },
    { day: "Wed", lectures: 4, submissions: 0 },
    { day: "Thu", lectures: 1, submissions: 3 },
    { day: "Fri", lectures: 5, submissions: 2 },
    { day: "Sat", lectures: 2, submissions: 1 },
    { day: "Sun", lectures: 0, submissions: 0 },
  ];

  const chartConfig = {
    data: weeklyData,
    isGroup: true,
    xField: "day",
    yField: "lectures",
    seriesField: "day",
    color: ["#1890ff", "#52c41a"],
    meta: { lectures: { alias: "Lectures" }, submissions: { alias: "Submissions" } },
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={2}>Profile</Title>
        <Space>
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </Space>
      </Row>

      <Row gutter={24}>
        {/* Left column */}
        <Col xs={24} md={8}>
          <Card hoverable style={{ marginBottom: 16 }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={avatarPreview || "/placeholder-avatar.png"}
                alt="avatar"
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginLeft:"120px" }}
              />
              <h3>{user.firstName} {user.lastName}</h3>
              <div>{user.specialization}</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                Member since: {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>

            <Row gutter={16} style={{ marginTop: 16, textAlign: "center" }}>
              <Col span={8}>
                <div style={{ fontWeight: 700 }}>{user.stats?.enrolledCourses}</div>
                <div style={{ fontSize: 12 }}>Enrolled</div>
              </Col>
              <Col span={8}>
                <div style={{ fontWeight: 700 }}>{user.stats?.lecturesWatched}</div>
                <div style={{ fontSize: 12 }}>Watched</div>
              </Col>
              <Col span={8}>
                <div style={{ fontWeight: 700 }}>{user.stats?.submissions}</div>
                <div style={{ fontSize: 12 }}>Submissions</div>
              </Col>
            </Row>

            <Space style={{ marginTop: 16 }}>
              <Button type="primary" onClick={() => router.push("/mycourses")}>
                My Courses
              </Button>
              <Button onClick={handleStartEdit}>Edit Profile</Button>
            </Space>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <Title level={5}>Medical License</Title>
            {licensePreview ? (
              <>
                <img
                  src={licensePreview}
                  alt="license"
                  style={{ width: "100%", objectFit: "contain", borderRadius: 6 }}
                />
                {user.license && (
                  <div style={{ marginTop: 8 }}>
                    <a href={user.license} download={`${user.email}-license.png`}>
                      Download license
                    </a>
                  </div>
                )}
              </>
            ) : <div>No license uploaded</div>}
          </Card>
        </Col>

        {/* Right column */}
        <Col xs={24} md={16}>
          <Card style={{ marginBottom: 16 }}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Account Info" key="1">
                {!editing ? (
                  <>
                    <p><Text strong>Full Name:</Text> {user.firstName} {user.lastName}</p>
                    <p><Text strong>Email:</Text> {user.email}</p>
                    <p><Text strong>Specialization:</Text> {user.specialization}</p>
                  </>
                ) : (
                  <Row gutter={16}>
                    <Col span={12}>
                      <label>First Name</label>
                      <Input name="firstName" value={draft.firstName} onChange={handleChange} />
                    </Col>
                    <Col span={12}>
                      <label>Last Name</label>
                      <Input name="lastName" value={draft.lastName} onChange={handleChange} />
                    </Col>
                    <Col span={12}>
                      <label>Specialization</label>
                      <Input name="specialization" value={draft.specialization} onChange={handleChange} />
                    </Col>
                    <Col span={12}>
                      <label>Email (readonly)</label>
                      <Input value={draft.email} readOnly />
                    </Col>
                    <Col span={12}>
                      <label>Profile Image</label>
                      <Input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                    </Col>
                    <Col span={12}>
                      <label>License</label>
                      <Input type="file" name="license" accept="image/*" onChange={handleChange} />
                    </Col>
                  </Row>
                )}
                {editing && (
                  <Space style={{ marginTop: 16 }}>
                    <Button type="primary" onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </Space>
                )}
              </Tabs.TabPane>

              <Tabs.TabPane tab="Security" key="2">
                <ChangePassword user={user} onSave={(updated) => { setUser(updated); saveUserToStorage(updated); }} />
              </Tabs.TabPane>

              <Tabs.TabPane tab="About" key="3">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p>{user.bio || "Add a short bio about yourself."}</p>
                  <Button icon={<EditOutlined />} size="small" onClick={() => setBioModalOpen(true)}>Edit</Button>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Insights" key="4">
                <Row gutter={16} style={{ textAlign: "center" }}>
                  <Col span={8}>
                    <div style={{ fontWeight: 700 }}>{user.stats?.enrolledCourses}</div>
                    <div>Enrolled</div>
                  </Col>
                  <Col span={8}>
                    <div style={{ fontWeight: 700 }}>{user.stats?.lecturesWatched}</div>
                    <div>Watched</div>
                  </Col>
                  <Col span={8}>
                    <div style={{ fontWeight: 700 }}>{user.stats?.submissions}</div>
                    <div>Submissions</div>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </Card>

          {/* Chart below right side */}
          <Card>
            <Title level={5}>Weekly Activity Chart</Title>
            <Column {...chartConfig} />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Edit Bio"
        open={bioModalOpen}
        onCancel={() => setBioModalOpen(false)}
        onOk={() => handleBioSave(draft?.bio || "")}
        okText="Save"
      >
        <Input.TextArea
          rows={4}
          value={draft?.bio}
          onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          placeholder="Write a short bio about yourself..."
        />
      </Modal>
    </div>
  );
}

function ChangePassword({ user, onSave }: any) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChange = () => {
    if (!user) return message.error("No user");
    if (oldPass !== user.password) return message.error("Old password incorrect (demo)");
    if (newPass.length < 6) return message.error("New password must be at least 6 chars");
    if (newPass !== confirm) return message.error("Confirm password does not match");

    const users = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const idx = users.findIndex((u: any) => u.email === user.email);
    if (idx >= 0) {
      users[idx].password = newPass;
      localStorage.setItem("registered_users", JSON.stringify(users));
      message.success("Password changed (demo)");
      onSave(users[idx]);
      setOldPass("");
      setNewPass("");
      setConfirm("");
    } else {
      message.error("User record not found");
    }
  };

  return (
    <Row gutter={8}>
      <Col span={8}>
        <Input.Password placeholder="Old password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
      </Col>
      <Col span={8}>
        <Input.Password placeholder="New password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
      </Col>
      <Col span={8}>
        <Input.Password placeholder="Confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </Col>
      <Col span={24} style={{ marginTop: 8 }}>
        <Button type="primary" onClick={handleChange}>Change Password</Button>
      </Col>
    </Row>
  );
}
