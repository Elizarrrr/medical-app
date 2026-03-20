import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Add image configuration for UploadThing and other external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // UploadThing's CDN
      },
      {
        protocol: 'https',
        hostname: 'cdn.tailgrids.com', // If you use Tailgrids images
      },
      // Add more domains as needed
    ],
  },
  
  // Just webpack config (Turbopack is disabled in package.json)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};

export default withFlowbiteReact(nextConfig);