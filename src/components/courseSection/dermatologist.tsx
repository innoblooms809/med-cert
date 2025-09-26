"use client";

import { Carousel, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const { Meta } = Card;

const dermatologistTests = [
  {
    title: "Clinical Dermatology",
    description: "Covers skin diseases, diagnosis, and topical treatments.",
    img: "https://tse2.mm.bing.net/th/id/OIP.PKaqx1BxL8Ane3kUN-l97QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/clinical-dermatology",
  },
  {
    title: "Cosmetic Dermatology",
    description: "Learn about botox, fillers, and aesthetic procedures.",
    img: "https://elyzeemc.com/wp-content/uploads/2022/06/cosmetic-dermatology.png",
    href: "/tests/cosmetic-dermatology",
  },
  {
    title: "Pediatric Dermatology",
    description: "Focus on skin conditions in infants and children.",
    img: "https://tse3.mm.bing.net/th/id/OIP.nuBj1BFGlzcgEb3KuZKJgAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/pediatric-dermatology",
  },
  {
    title: "Dermato-Oncology",
    description: "Covers skin cancers and surgical interventions.",
    img: "https://tse1.explicit.bing.net/th/id/OIP.AZ8fK026HNYpTwTLXs4PegHaDk?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/tests/dermato-oncology",
  },
];


export default function Dermatologist() {
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
              Courses for <span className="text-[var(--section-primary)]">Dermatologist</span>
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
          {dermatologistTests.map((test, idx) => (
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
