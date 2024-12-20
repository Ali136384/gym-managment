/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["ar", "en", "fr", "nl-NL"],
    defaultLocale: "en",
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
