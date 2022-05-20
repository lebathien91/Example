/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "kuchuoi.com"],
    loader: "default",
  },
  // Cấu hình các hằng số
  DOMAIN: process.env.DOMAIN || "https://kuchuoi.com", // không có / ở cuối domain
  APP_ID_FACEBOOK: process.env.APP_ID_FACEBOOK || "636890294324159",
  GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS || "G-HCXZYN4ZK7",
  PAGE_SIZE: 6, // số bài viết trên 1 trang
  SELECTION: "Featured", // Lựa chọn bài viết hiển thị theo selection
  COMMENT: true,

  // Cấu hình mặc định cho seo
  DEFAULT_GLOBAL: {
    siteName: "Kủ Chuối Blog",
    defaultSeo: {
      metaTitle: "Trang Chủ",
      metaDescription:
        "Một bác sĩ muốn nâng cao sức khoẻ cộng đồng và thích viết blog để chia sẻ những gì mình biết đến mọi người.",
    },
    social: {
      facebook: "https://www.facebook.com/lebathien91",
      twitter: "https://twitter.com/trungtamtreem",
      link: "https://kuchuoi.com",
    },
  },
};

module.exports = nextConfig;
