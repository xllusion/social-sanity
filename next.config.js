/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  env: {},
  images: {
    domains: ['picsum.photos', 'lh3.googleusercontent.com'],
  },
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
};

module.exports = nextConfig
