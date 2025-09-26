"use client";

import { Carousel, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const { Meta } = Card;

const homoeopathTests = [
  {
    title: "Principles of Homeopathy",
    description: "Covers similia principle, potentization, and remedy selection.",
    img: "https://nigolifeline.com/wp-content/uploads/2023/09/7-cardinal-principles-of-homeopathy.jpg",
    href: "/tests/homeopathy-principles",
  },
  {
    title: "Materia Medica",
    description: "Learn about key remedies and their indications.",
    img: "https://www.herbalella.com/images/materiamedica.png",
    href: "/tests/materia-medica",
  },
  {
    title: "Organon of Medicine",
    description: "Study Hahnemann’s philosophy and therapeutic guidelines.",
    img: "https://www.thehealthsite.com/wp-content/uploads/2022/01/homeopathy-medicine-treatment-in-hindi.jpg",
    href: "/tests/organon",
  },
  {
    title: "Case Taking & Analysis",
    description: "Covers patient interview techniques and remedy matching.",
    img: "https://framerusercontent.com/images/63XfAPUQFH4D0BWzoIjFJDUyks.png",
    href: "/tests/case-taking",
  },
];


export default function Homoeopath() {
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
              Courses for <span className="text-[var(--section-primary)]">Homoeopath</span>
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
          {homoeopathTests.map((test, idx) => (
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
