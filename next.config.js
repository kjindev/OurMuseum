/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["sema.seoul.go.kr"],
  },
};
