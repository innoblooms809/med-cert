'use client';

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Table,
  Tag,
  Space,
  message,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

interface CourseType {
  courseRole: string;
  specialization: string;
  title: string;
  description: string;
  banner: string | File | null;
  video: File | null;
  videoLink: string;
  author: string;
  publishedDate: string;
  expiryDays: number;
}

export default function Course() {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Preloaded 5 dummy courses (Doctor and Nurse only)
  const [courses, setCourses] = useState<CourseType[]>([
    {
      courseRole: "Doctor",
      specialization: "Cardiology",
      title: "Heart Health Basics",
      description: "Learn about cardiology essentials.",
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Dr. Ahmed Al Mansoori",
      publishedDate: "2025-09-20",
      expiryDays: 7,
    },
    {
      courseRole: "Doctor",
      specialization: "Neurology",
      title: "Brain Function & Disorders",
      description: "Detailed guide to understanding brain functions.",
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Dr. Arjumand Khan",
      publishedDate: "2025-09-18",
      expiryDays: 10,
    },
    {
      courseRole: "Nurse",
      specialization: "Emergency Care",
      title: "ICU Care Essentials",
      description: "Practical ICU nursing techniques and patient care.",
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Nurse Aisha Ali",
      publishedDate: "2025-09-15",
      expiryDays: 30,
    },
    {
      courseRole: "Nurse",
      specialization: "Pediatrics",
      title: "Pediatric Nursing",
      description: "Childcare and pediatric nursing best practices.",
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Nurse Fatima Noor",
      publishedDate: "2025-09-12",
      expiryDays: 7,
    },
    {
      courseRole: "Doctor",
      specialization: "Orthopedics",
      title: "Orthopedic Surgery Insights",
      description: "Overview of orthopedic surgery and rehabilitation.",
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Dr. Imran Malik",
      publishedDate: "2025-09-10",
      expiryDays: 3,
    },
  ]);

  const specializations: Record<string, string[]> = {
    Doctor: ["Cardiology", "Neurology", "Orthopedics"],
    Nurse: ["Pediatrics", "Emergency Care", "General Nursing"],
  };

  const expiryOptions = [
    { value: 3, label: "3 days" },
    { value: 7, label: "7 days" },
    { value: 10, label: "10 days" },
    { value: 30, label: "30 days" },
  ];

  const role = Form.useWatch("courseRole", form);

  useEffect(() => {
    form.setFieldsValue({ specialization: undefined });
  }, [role, form]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const getUploadedFile = (val: any) => {
    if (!val) return null;
    if (Array.isArray(val)) return val[0]?.originFileObj ?? null;
    if (val.fileList) return val.fileList[0]?.originFileObj ?? null;
    return val.file?.originFileObj ?? null;
  };

  const columns = [
  { title: "Role", dataIndex: "courseRole", key: "courseRole", width: 100 },
  { title: "Specialization", dataIndex: "specialization", key: "specialization", width: 150 },
  { title: "Title", dataIndex: "title", key: "title", width: 150 },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 250, // keeps buttons aligned, long text truncated
    render: (text: string) => <span title={text}>{text}</span>,
  },
  {
    title: "Banner",
    dataIndex: "banner",
    key: "banner",
    width: 100,
    render: (banner: string | File | null) =>
      banner ? (
        typeof banner === "string" ? (
          <img src={banner} alt="banner" className="w-20 h-12 object-cover rounded" />
        ) : (
          <img src={URL.createObjectURL(banner)} alt="banner" className="w-20 h-12 object-cover rounded" />
        )
      ) : null,
  },
  {
    title: "Video",
    key: "video",
    width: 120,
    render: (_: any, record: CourseType) =>
      record.video ? (
        <a href={URL.createObjectURL(record.video)} target="_blank" rel="noreferrer">▶ Video</a>
      ) : record.videoLink ? (
        <a href={record.videoLink} target="_blank" rel="noreferrer">▶ Video Link</a>
      ) : null,
  },
  { title: "Author", dataIndex: "author", key: "author", width: 150 },
  { title: "Published", dataIndex: "publishedDate", key: "publishedDate", width: 120 },
  {
    title: "Expiry",
    dataIndex: "expiryDays",
    key: "expiryDays",
    width: 100,
    render: (days: number) => <Tag color="blue">{days} days</Tag>,
  },
  {
    title: "Actions",
    key: "actions",
    width: 180,
    render: (_: any, record: CourseType, index: number) => (
      <Space>
        <Button size="small" onClick={() => handleView(record)}>View</Button>
        <Button size="small" type="primary" onClick={() => openEditModal(index)}>Edit</Button>
        <Button size="small" danger onClick={() => handleDelete(index)}>Delete</Button>
      </Space>
    ),
  },
];


  const onFinish = (values: any) => {
    const bannerFile = getUploadedFile(values.banner);
    const videoFile = getUploadedFile(values.video);

    const newCourse: CourseType = {
      courseRole: values.courseRole,
      specialization: values.specialization,
      title: values.title,
      description: values.description,
      banner: bannerFile || null,
      video: videoFile || null,
      videoLink: values.videoLink || "",
      author: values.author,
      publishedDate: dayjs().format("YYYY-MM-DD"),
      expiryDays: values.expiryDays,
    };

    setCourses((prev) => [...prev, newCourse]);
    message.success("Course created successfully!");
    form.resetFields();
  };

  const handleView = (course: CourseType) => {
    Modal.info({
      title: "Course Details",
      width: 600,
      content: (
        <div style={{ lineHeight: 1.6 }}>
          <p><b>Role:</b> {course.courseRole}</p>
          <p><b>Specialization:</b> {course.specialization}</p>
          <p><b>Title:</b> {course.title}</p>
          <p><b>Description:</b> {course.description}</p>
          <p><b>Author:</b> {course.author}</p>
          <p><b>Published:</b> {course.publishedDate}</p>
          <p><b>Expiry:</b> {course.expiryDays} days</p>
          {course.banner && typeof course.banner === "string" && (
            <img src={course.banner} alt="banner" style={{ maxWidth: "100%", marginTop: 8 }} />
          )}
        </div>
      ),
    });
  };

  const openEditModal = (index: number) => {
    const c = courses[index];
    setEditingIndex(index);
    editForm.setFieldsValue({
      courseRole: c.courseRole,
      specialization: c.specialization,
      title: c.title,
      author: c.author,
      videoLink: c.videoLink,
      expiryDays: c.expiryDays,
      description: c.description,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (values: any) => {
    if (editingIndex === null) return;
    const bannerFile = getUploadedFile(values.banner);
    const videoFile = getUploadedFile(values.video);

    setCourses((prev) => {
      const copy = [...prev];
      copy[editingIndex] = {
        ...copy[editingIndex],
        courseRole: values.courseRole,
        specialization: values.specialization,
        title: values.title,
        description: values.description,
        banner: bannerFile ?? copy[editingIndex].banner,
        video: videoFile ?? copy[editingIndex].video,
        videoLink: values.videoLink ?? copy[editingIndex].videoLink,
        author: values.author,
        expiryDays: values.expiryDays,
      };
      return copy;
    });

    message.success("Course updated");
    setIsEditModalOpen(false);
    setEditingIndex(null);
    editForm.resetFields();
  };

  const handleDelete = (index: number) => {
    Modal.confirm({
      title: "Delete course?",
      onOk: () => {
        setCourses((prev) => prev.filter((_, i) => i !== index));
        message.success("Course deleted");
      },
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Create Course</h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Form.Item label="Course Role" name="courseRole" rules={[{ required: true }]}>
            <Select placeholder="Select Role">
              <Option value="Doctor">Doctor</Option>
              <Option value="Nurse">Nurse</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
            <Select placeholder="Select Specialization" disabled={!role}>
              {role && specializations[role].map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Author" name="author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Upload Banner" name="banner" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Banner</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Upload Video" name="video" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}  >Upload Video</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Or Video Link" name="videoLink">
            <Input />
          </Form.Item>

          <Form.Item label="Expiry Days" name="expiryDays" rules={[{ required: true }]}>
            <Select placeholder="Select expiry">
              {expiryOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{background:"#7b1fa2"}}>Create Course</Button>
        </Form.Item>
      </Form>

      <h2 style={{ fontSize: 20, marginTop: 32 }}>Courses List</h2>
      <Table dataSource={courses} columns={columns}  rowKey={(record) => record.title} scroll={{ x: 'max-content' }} />

      {/* Edit Modal */}
      <Modal
        title="Edit Course"
        open={isEditModalOpen}
        onCancel={() => { setIsEditModalOpen(false); setEditingIndex(null); editForm.resetFields(); }}
        footer={null}
        width={700}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item label="Course Role" name="courseRole" rules={[{ required: true }]}>
              <Select placeholder="Select Role">
                <Option value="Doctor">Doctor</Option>
                <Option value="Nurse">Nurse</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
              <Select placeholder="Select Specialization">
                {Object.values(specializations).flat().map((s) => (
                  <Option key={s} value={s}>{s}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Author" name="author" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Upload Banner" name="banner" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
              <Upload beforeUpload={() => false} maxCount={1} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Banner</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Upload Video" name="video" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Video</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Video Link" name="videoLink" >
              <Input />
            </Form.Item>

            <Form.Item label="Expiry Days" name="expiryDays" rules={[{ required: true }]}>
              <Select placeholder="Select expiry">
                {expiryOptions.map((opt) => (
                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => { setIsEditModalOpen(false); editForm.resetFields(); }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
