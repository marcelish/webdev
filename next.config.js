/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/webdev",
  images: { unoptimized: true },
};

module.exports = nextConfig;
