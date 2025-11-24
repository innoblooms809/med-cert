import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds:true
  },
  images: {
    domains: ["images.unsplash.com","lnkly.tech"],
  },
};

export default nextConfig;
