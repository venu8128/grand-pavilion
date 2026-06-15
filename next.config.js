/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Ideal for simple static hosting or easy custom asset setups
  },
}

module.exports = nextConfig
