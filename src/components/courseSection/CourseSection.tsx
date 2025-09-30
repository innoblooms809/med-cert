"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
import { useCart } from "@/components/cartContext";
import coursesData from "@/utils/courseData/courses"; // adjust path

import CoursesBox from "@/components/courseSection/CourseBox";

function CoursesSection() {
  const categories = Object.keys(coursesData);
  const [currentTab, setCurrentTab] = useState(categories[0]);
  const { addToCart } = useCart();

  const handleAddToCart = (course: any) => {
    addToCart(course);
  };

  return (
    <div id="courses-section" className="py-12 bg-[var(--content-bg)]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[var(--section-text)] mb-2">
          A broad selection of courses
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose from online video courses with new additions published every
          month
        </p>

        {/* Ant Design Tabs */}
        <Tabs
          defaultActiveKey={categories[0]}
          onChange={(key) => setCurrentTab(key)}
          className="mb-6"
          items={categories.map((cat) => ({
            key: cat,
            label: <span className="font-medium">{cat}</span>,
          }))}
        />

        <CoursesBox
        sectionData={coursesData[currentTab as keyof typeof coursesData]}
        onAddToCart={handleAddToCart}
        />

      </div>
    </div>
  );
}

export default CoursesSection;
