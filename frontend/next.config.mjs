/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth/).*)",
        destination: (process.env.BACKEND_URL || "http://localhost:5000") + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
