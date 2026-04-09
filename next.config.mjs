/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/testing",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
