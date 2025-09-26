"use client";

import { Carousel, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const { Meta } = Card;

const entSpecialistTests = [
  {
    title: "Otology",
    description: "Covers ear disorders, hearing loss, and tinnitus management.",
    img: "https://ascentist.com/wp-content/uploads/2021/11/Otology-and-Neurotology-in-Kansas-City-MO.jpg",
    href: "/tests/otology",
  },
  {
    title: "Rhinology",
    description: "Learn about nasal conditions, sinusitis, and allergy treatments.",
    img: "https://fadlullahaksoy.com/en/wp-content/uploads/2019/12/Nasal-Diseases-Rhinology.jpg",
    href: "/tests/rhinology",
  },
  {
    title: "Laryngology",
    description: "Focus on voice disorders, throat infections, and vocal cord care.",
    img: "https://www.masseyeandear.org/assets/MEE/images/ent/education/laryngology-fellowship-banner.png",
    href: "/tests/laryngology",
  },
  {
    title: "Head & Neck Surgery",
    description: "Covers surgical procedures for tumors and trauma.",
    img: "https://www.oto-hns.northwestern.edu/images/1440x400/main_page-1440x600.jpg",
    href: "/tests/head-neck-surgery",
  },
];


export default function ENTSpecialist() {
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
              Courses for <span className="text-[var(--section-primary)]">Ear Nose Teeth Specialist</span>
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
          {entSpecialistTests.map((test, idx) => (
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
