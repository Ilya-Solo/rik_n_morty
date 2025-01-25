import type { NextConfig } from "next";
const { i18n } = require("./next-i18next.config");

const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
