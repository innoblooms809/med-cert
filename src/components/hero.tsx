"use client";

import { Carousel } from "antd";
import Image from "next/image";
import hero1 from '../../public/images/hero1.jpg'
import hero2 from '../../public/images/hero2.jpg'
import hero3 from '../../public/images/hero3.png'
import { 
  MedicineBoxOutlined, 
  WomanOutlined, 
  UserOutlined, 
  SkinOutlined, 
  SoundOutlined, 
  ExperimentOutlined, 
  BranchesOutlined 
} from "@ant-design/icons";
const domains = [
  { icon: <MedicineBoxOutlined />, label: "Dentist", color: "bg-yellow-100 text-yellow-700", link:"#dentist" },
  { icon: <WomanOutlined />, label: "Gynecologist", color: "bg-green-100 text-green-700", link:"#gynecologist" },
  { icon: <UserOutlined />, label: "General Physician", color: "bg-red-100 text-red-700", link:"#general-physician" },
  { icon: <SkinOutlined />, label: "Dermatologist", color: "bg-purple-100 text-purple-700", link:"#dermatologist" },
  { icon: <SoundOutlined />, label: "ent-Specialist", color: "bg-blue-100 text-blue-700", link:"#ent-Specialist" },
  { icon: <ExperimentOutlined />, label: "Homoeopath", color: "bg-orange-100 text-orange-700", link:"#homoeopath" },
  { icon: <BranchesOutlined />, label: "Ayurveda", color: "bg-orange-100 text-orange-700", link:"#ayurveda" },
];

export default function Hero() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-12 lg:px-20 pt-12 bg-[var(--section-bg-2)] text-[var(--section-text)]">
        {/* Left Side */}
        <div className="flex-1 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Learn{" "}
            <span className="text-[var(--section-primary)]">Healthcare Skills</span>{" "}
            That Matter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Access professional courses designed for doctors and nurses. Upgrade
            your career with certifications and real-world learning.
          </p>
          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 mt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[var(--section-primary)]">
                500+
              </h3>
              <p className="text-sm">Courses Available</p>
            </div>
            {/* More stats can be added here */}
          </div>
        </div>
        {/* Right Side - Ant Design Carousel */}
        <div className="flex-1 max-w-xl w-full">
          <Carousel autoplay infinite>
            <div>
              <Image
                src={hero1}
                alt="Hero Slide 1"
                width={800}
                height={500}
                className="rounded-xl object-cover w-full h-[350px] md:h-[400px] lg:h-[450px]"
                priority
              />
            </div>
            <div>
              <Image
                src={hero2}
                alt="Hero Slide 2"
                width={800}
                height={500}
                className="rounded-xl object-cover w-full h-[350px] md:h-[400px] lg:h-[450px]"
              />
            </div>
            <div>
              <Image
                src={hero3}
                alt="Hero Slide 3"
                width={800}
                height={500}
                className="rounded-xl object-cover w-full h-[350px] md:h-[400px] lg:h-[450px]"
              />
            </div>
          </Carousel>
        </div>
      </section>
      <section className="flex justify-center items-center pb-12">
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Trending Domains</h3>
          <div className="flex flex-wrap gap-4 items-center ">
            {domains.map((domain, idx) => (
              <a href={domain.link} key={idx}>
              <div
                className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 shadow-sm bg-white hover:shadow-md transition"
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${domain.color}`}
                >
                  {domain.icon}
                </div>
                <span className="text-sm font-medium">{domain.label}</span>
              </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
