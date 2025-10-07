import React from "react";
import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

type CoursesBoxProps = {
  sectionData: any[];
  onAddToCart: (course: any) => void;
  dict: any;
};

function CoursesBox({ sectionData, onAddToCart, dict }: CoursesBoxProps) {
  if (!sectionData) return <p>No courses available</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sectionData.map((course) => (
        <Card
          key={course.id}
          hoverable
          cover={
            <img
              src={course.img}
              alt={course.title}
              className="h-48 w-full object-cover"
            />
          }
          className="rounded-xl shadow-md hover:shadow-lg transition"
        >
          <Meta
            title={course.title}
            description={
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  By {course.instructor} 
                </p>
                <p className="text-xs mt-1 line-clamp-2">
                  {course.description}
                </p>
                <p className="font-semibold text-[var(--section-primary)] mt-2">
                  AED {course.price}
                </p>
              </div>
            }
          />
          <div className="mt-4 flex justify-end">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => onAddToCart(course)}
              className="!bg-[var(--section-primary)] !text-white !border-none hover:!bg-purple-700 !px-4 !py-2 !rounded-md"
            >
              {dict.buttonText.addtoCart}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CoursesBox;
