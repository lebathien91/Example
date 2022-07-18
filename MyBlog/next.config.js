/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URL:
      "mongodb+srv://kuchuoi:2261988@cluster0.kwsc0.mongodb.net/MyBlog_Dev?retryWrites=true&w=majority",
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
