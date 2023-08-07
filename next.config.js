const withNextI18n = require('next-intl/plugin')(
  './i18n.ts',
);


module.exports = withNextI18n({
  images: {
    domains: [
      'raw.githubusercontent.com',
    ],
  },
});
