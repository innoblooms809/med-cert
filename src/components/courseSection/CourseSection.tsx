"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
import { useCart } from "@/components/cartContext";
// import coursesData from "@/utils/courseData/courses"; 

import CoursesBox from "@/components/courseSection/CourseBox";

function CoursesSection({dict, lang}:any) {
  const categories = Object.keys(dict.course.courseData || {});
  // console.log(dict.course.courseData, "todays console")
  const [currentTab, setCurrentTab] = useState(categories[0]);
  const { addToCart } = useCart();

  const handleAddToCart = (course: any) => {
    addToCart(course);
  };

  return (
    <div id="courses-section" className="py-12 bg-[var(--content-bg)]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[var(--section-text)] mb-2">
          {dict.course.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {dict.course.subtitle}
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
        sectionData={dict.course.courseData[currentTab as keyof typeof dict.course.courseData]}
        onAddToCart={handleAddToCart}
        dict={dict}
        />

      </div>
    </div>
  );
}

export default CoursesSection;
