/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: [
      'en',
      'zh',
      'jp',
      'kr',
    ],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
