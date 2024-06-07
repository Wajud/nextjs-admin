/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dfstudio-d420.kxcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.simplilearn.com",
      },
    ],
  },
};

module.exports = nextConfig;
