import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["google.com","localhost"]
  },
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_PROJECT_NAME: process.env.NEXT_APP_PROJECT_NAME,
    NEXT_APP_MEDIA_URL: process.env.NEXT_APP_MEDIA_URL,
  },
  async rewrites() {
    return [
      {
        source: "/sign-up",
        destination: "/auth/sign-up", 
      },
      {
        source: "/login",
        destination: "/auth/login", 
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/auth/sign-up", 
        destination: "/sign-up",  
        permanent: true,  
      },
      {
        source: "/auth/login",  
        destination: "/login",  
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
