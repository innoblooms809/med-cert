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
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;
const { TextArea } = Input;

type UploadValue =
  | UploadFile[]
  | { fileList?: UploadFile[]; file?: UploadFile }
  | null
  | undefined;

type FormValues = {
  courseRole: string;
  specialization: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  banner?: UploadValue;
  video?: UploadValue;
  videoLink?: string;
  author: string;
  expiryDays: number;
};

interface CourseType {
  id: string;
  courseRole: string;
  specialization: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
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
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Preloaded 5 dummy courses
  const [courses, setCourses] = useState<CourseType[]>([
    {
      id: "1",
      courseRole: "Doctor",
      specialization: "Cardiology",
      title: "Heart Health Basics",
      shortDescription: "Learn about cardiology essentials.",
      description: "This comprehensive course covers all the fundamental aspects of cardiology. You'll learn about heart anatomy, common cardiovascular diseases, diagnostic techniques, and treatment options.",
      price: 99.99,
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Dr. Ahmed Al Mansoori",
      publishedDate: "2025-09-20",
      expiryDays: 7,
    },
    {
      id: "2",
      courseRole: "Doctor",
      specialization: "Neurology",
      title: "Brain Function & Disorders",
      shortDescription: "Detailed guide to understanding brain functions.",
      description: "Explore the complex world of neurology with this in-depth course. Understand brain functions, neurological disorders, diagnostic methods, and modern treatment approaches.",
      price: 149.99,
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Dr. Arjumand Khan",
      publishedDate: "2025-09-18",
      expiryDays: 10,
    },
    {
      id: "3",
      courseRole: "Nurse",
      specialization: "Emergency Care",
      title: "ICU Care Essentials",
      shortDescription: "Practical ICU nursing techniques and patient care.",
      description: "Master the essential skills required for ICU nursing. Learn about critical care protocols, patient monitoring, emergency procedures, and advanced nursing techniques.",
      price: 79.99,
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Nurse Aisha Ali",
      publishedDate: "2025-09-15",
      expiryDays: 30,
    },
    {
      id: "4",
      courseRole: "Nurse",
      specialization: "Pediatrics",
      title: "Pediatric Nursing",
      shortDescription: "Childcare and pediatric nursing best practices.",
      description: "Specialize in pediatric nursing with this comprehensive course. Learn about child development, common pediatric conditions, family-centered care, and specialized nursing interventions.",
      price: 89.99,
      banner: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
      video: null,
      videoLink: "https://youtu.be/nqZyIis6IJs?si=jS5c-O9yT_cCKwfK",
      author: "Nurse Fatima Noor",
      publishedDate: "2025-09-12",
      expiryDays: 7,
    },
    {
      id: "5",
      courseRole: "Doctor",
      specialization: "Orthopedics",
      title: "Orthopedic Surgery Insights",
      shortDescription: "Overview of orthopedic surgery and rehabilitation.",
      description: "Gain insights into orthopedic surgery procedures, rehabilitation protocols, and patient management. This course covers both surgical techniques and post-operative care.",
      price: 199.99,
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

  // Video upload validation
  const videoUploadProps: UploadProps = {
    beforeUpload: (file) => {
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        message.error('You can only upload video files!');
        return Upload.LIST_IGNORE;
      }
      const isLt500M = file.size / 1024 / 1024 < 500;
      if (!isLt500M) {
        message.error('Video must be smaller than 500MB!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    maxCount: 1,
  };

  useEffect(() => {
    form.setFieldsValue({ specialization: undefined });
  }, [role, form]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const getUploadedFile = (val: UploadValue): File | null => {
    if (!val) return null;
    if (Array.isArray(val)) return val[0]?.originFileObj ?? null;
    if ("fileList" in val && val.fileList) return val.fileList[0]?.originFileObj ?? null;
    if ("file" in val && val.file) return val.file.originFileObj ?? null;
    return null;
  };

  const columns = [
    { title: "Role", dataIndex: "courseRole", key: "courseRole", width: 100 },
    { title: "Specialization", dataIndex: "specialization", key: "specialization", width: 150 },
    { title: "Title", dataIndex: "title", key: "title", width: 150 },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price: number) => `AED ${price.toFixed(2)}`,
    },
    {
      title: "Short Description",
      dataIndex: "shortDescription",
      key: "shortDescription",
      ellipsis: true,
      width: 250,
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
            <Image src={banner} alt="banner" width={80} height={48} className="object-cover rounded" />
          ) : (
            <Image src={URL.createObjectURL(banner)} alt="banner" width={80} height={48} className="object-cover rounded" />
          )
        ) : null,
    },
    {
      title: "Video",
      key: "video",
      width: 120,
      render: (_: unknown, record: CourseType) =>
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
      render: (_: unknown, record: CourseType, index: number) => (
        <Space>
          <Button size="small" onClick={() => handleView(record)}>View</Button>
          <Button size="small" type="primary" onClick={() => openEditModal(index)}>Edit</Button>
          <Button size="small" danger onClick={() => handleDelete(index)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const onFinish = (values: FormValues) => {
    const bannerFile = getUploadedFile(values.banner);
    const videoFile = getUploadedFile(values.video);

    const newCourse: CourseType = {
      id: uuidv4(),
      courseRole: values.courseRole,
      specialization: values.specialization,
      title: values.title,
      shortDescription: values.shortDescription,
      description: description || values.description,
      price: values.price,
      banner: bannerFile || null,
      video: videoFile || null,
      videoLink: values.videoLink || "",
      author: values.author,
      publishedDate: dayjs().format("YYYY-MM-DD"),
      expiryDays: values.expiryDays,
    };

    setCourses((prev) => [newCourse, ...prev]);
    message.success("Course created successfully!");
    form.resetFields();
    setDescription('');
    setShowForm(false);
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
          <p><b>Price:</b> AED {course.price.toFixed(2)}</p>
          <p><b>Short Description:</b> {course.shortDescription}</p>
          <p><b>Description:</b> {course.description}</p>
          <p><b>Author:</b> {course.author}</p>
          <p><b>Published:</b> {course.publishedDate}</p>
          <p><b>Expiry:</b> {course.expiryDays} days</p>
          {course.banner && typeof course.banner === "string" && (
            <Image src={course.banner} alt="banner" width={800} height={450} style={{ marginTop: 8 }} className="max-w-full object-cover rounded" />
          )}
        </div>
      ),
    });
  };

  const openEditModal = (index: number) => {
    const c = courses[index];
    setEditingIndex(index);
    setEditDescription(c.description);
    editForm.setFieldsValue({
      courseRole: c.courseRole,
      specialization: c.specialization,
      title: c.title,
      price: c.price,
      author: c.author,
      videoLink: c.videoLink,
      expiryDays: c.expiryDays,
      shortDescription: c.shortDescription,
      description: c.description,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (values: FormValues) => {
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
        shortDescription: values.shortDescription,
        description: editDescription || values.description,
        price: values.price,
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
    setEditDescription('');
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20 }}>{showForm ? "Create Course" : "Courses List"}</h2>
        <Button type="primary" style={{ background: "#7b1fa2" }} onClick={() => setShowForm(!showForm)}>
          {showForm ? "⬅ Back to List" : "➕ Create Course"}
        </Button>
      </div>

      {showForm && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item label="Course For" name="courseRole" rules={[{ required: true }]}>
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

            <Form.Item label="Course Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Course Price (AED)"
              name="price"
              rules={[{ required: true, message: 'Please enter course price' }]}
            >
              <InputNumber
                min={0}
                max={10000}
                step={0.01}
                precision={2}
                style={{ width: '100%' }}
                placeholder="0.00"
                formatter={(value) => `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/AED\s?|(,*)/g, '') || ''}
              />
            </Form.Item>

            <Form.Item label="Author" name="author" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Expiry Days" name="expiryDays" rules={[{ required: true }]}>
              <Select placeholder="Select expiry">
                {expiryOptions.map((opt) => (
                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Upload Banner" name="banner" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
              <Upload beforeUpload={() => false} maxCount={1} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Banner</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Upload Video"
              name="video"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              extra="Only video files allowed (max 500MB)"
            >
              <Upload {...videoUploadProps}>
                <Button icon={<UploadOutlined />}>Upload Video</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Or Video Link" name="videoLink">
              <Input placeholder="https://youtube.com/..." />
            </Form.Item>
          </div>

          <Form.Item 
            label="Short Description" 
            name="shortDescription" 
            rules={[{ required: true, message: 'Please enter short description' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="Enter a brief summary of the course (this will be shown in the course list)..."
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ background: "#7b1fa2" }}>Create Course</Button>
          </Form.Item>
        </Form>
      )}

      {!showForm && (
        <Table
          dataSource={courses}
          columns={columns}
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Course"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingIndex(null);
          setEditDescription('');
          editForm.resetFields();
        }}
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

            <Form.Item
              label="Course Price (AED)"
              name="price"
              rules={[{ required: true, message: 'Please enter course price' }]}
            >
              <InputNumber
                min={0}
                max={10000}
                step={0.01}
                precision={2}
                style={{ width: '100%' }}
                placeholder="0.00"
                formatter={(value) => `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/AED\s?|(,*)/g, '') || ''}
              />
            </Form.Item>

            <Form.Item label="Author" name="author" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Expiry Days" name="expiryDays" rules={[{ required: true }]}>
              <Select placeholder="Select expiry">
                {expiryOptions.map((opt) => (
                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Upload Banner" name="banner" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
              <Upload beforeUpload={() => false} maxCount={1} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Banner</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Upload Video"
              name="video"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              extra="Only video files allowed (max 500MB)"
            >
              <Upload {...videoUploadProps}>
                <Button icon={<UploadOutlined />}>Upload Video</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Video Link" name="videoLink">
              <Input placeholder="https://youtube.com/..." />
            </Form.Item>
          </div>

          <Form.Item 
            label="Short Description" 
            name="shortDescription" 
            rules={[{ required: true, message: 'Please enter short description' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="Enter a brief summary of the course..."
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => {
                setIsEditModalOpen(false);
                setEditDescription('');
                editForm.resetFields();
              }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}