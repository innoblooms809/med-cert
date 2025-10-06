export type CourseType = {
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
};
