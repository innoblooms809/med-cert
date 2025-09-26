"use client";

import { Carousel, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const { Meta } = Card;

const gynecologistTests = [
  {
    title: "Obstetrics",
    description: "Focus on pregnancy, labor, delivery, and postpartum care.",
    img: "https://tse1.mm.bing.net/th/id/OIP.5eoHhDJ9XF4BEGAcmVCXSwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/obstetrics",
  },
  {
    title: "Reproductive Endocrinology",
    description: "Covers infertility, IVF, hormonal disorders, and reproductive health.",
    img: "https://tse3.mm.bing.net/th/id/OIP.Ik13Z6JDhESxar1l39wXDQHaE0?w=740&h=482&rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/reproductive-endocrinology",
  },
  {
    title: "Gynecologic Oncology",
    description: "Learn about cancers of the female reproductive system and treatments.",
    img: "https://tse1.mm.bing.net/th/id/OIP.z7OhT5Xr02j46s5b2zu9fAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/gynecologic-oncology",
  },
  {
    title: "Maternal-Fetal Medicine",
    description: "Covers high-risk pregnancies and fetal complications.",
    img: "https://tse1.explicit.bing.net/th/id/OIP.Jf1K3ZCurMB7cIn12XVnwQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/maternal-fetal-medicine",
  },
];

export default function Gynecologist() {
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
              Courses for <span className="text-[var(--section-primary)]">Gynecologist</span>
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
          {gynecologistTests.map((test, idx) => (
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
