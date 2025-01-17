/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx"
import withPlugins from "next-compose-plugins"
import createNextIntlPlugin from "next-intl/plugin"
import withBudleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin()
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
    ],
  },
}

export default withPlugins(
  [
    withMDX(),
    withNextIntl,
    withBudleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    })
  ],
  nextConfig
)
