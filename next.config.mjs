/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Finance",
  assetPrefix: "/Finance/",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
