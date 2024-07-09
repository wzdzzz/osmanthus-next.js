/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx"
import withPlugins from "next-compose-plugins"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
}

export default withPlugins(
  [
    withMDX(),
    withNextIntl,
  ],
  nextConfig
)
