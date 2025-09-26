"use client";

import { Carousel, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const { Meta } = Card;

const ayurvedaTests = [
  {
    title: "Basic Concepts of Ayurveda",
    description: "Covers doshas, dhatus, and body constitution.",
    img: "https://el-vergel.com/wp-content/uploads/2020/09/Kundan-ayurveda-edited.jpg",
    href: "/tests/basic-ayurveda",
  },
  {
    title: "Panchakarma Therapy",
    description: "Learn detoxification techniques and rejuvenation therapies.",
    img: "https://i.pinimg.com/originals/b3/89/7d/b3897d1398dcc1be56e4cebce64e5b19.jpg",
    href: "/tests/panchakarma",
  },
  {
    title: "Dravyaguna",
    description: "Study medicinal herbs and their pharmacological actions.",
    img: "https://i1.wp.com/www.nctayurvedacollege.in/wp-content/uploads/2017/12/dravyaguna-min.jpg?fit=449%2C300&ssl=1",
    href: "/tests/dravyaguna",
  },
  {
    title: "Ayurvedic Diagnosis",
    description: "Covers nadi pariksha, prakriti analysis, and disease classification.",
    img: "https://healthy-ojas.com/sites/default/files/natural/ayurveda-pulse-diagnosis.jpg",
    href: "/tests/ayurvedic-diagnosis",
  },
];


export default function Ayurveda() {
  const carouselRef = useRef<any>(null);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <section className="py-12 bg-[var(--section-bg-1)] text-[var(--section-text)] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Courses for <span className="text-[var(--section-primary)]">Ayurveda</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Master dentistry with practice tests across specializations.
            </p>
          </div>
          <Link
            href="/tests/dentist"
            className="text-[var(--section-primary)] hover:underline text-sm flex items-center gap-1"
          >
            View all →
          </Link>
        </div>

        {/* Custom Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <LeftOutlined />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <RightOutlined />
        </button>

        {/* Carousel */}
        <Carousel
          ref={carouselRef}
          dots={false}
          slidesToShow={3}
          infinite={false}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
          ]}
        >
          {ayurvedaTests.map((test, idx) => (
            <div key={idx} className="px-2">
              <Card
                hoverable
                className="rounded-xl shadow-sm"
                cover={
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                    <img
                      src={test.img}
                      alt={test.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                }
              >
                <Meta
                  title={test.title}
                  description={
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {test.description}
                    </p>
                  }
                />
                <Link
                  href={test.href}
                  className="mt-3 inline-block text-[var(--section-primary)] text-sm font-medium hover:underline"
                >
                  Start Test →
                </Link>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
