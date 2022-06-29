/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000",
    CLOUD_UPDATE_PRESET: "myblog",
    CLOUD_NAME: "kuchuoi",
    CLOUD_API: "https://api.cloudinary.com/v1_1/kuchuoi/image/upload",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
