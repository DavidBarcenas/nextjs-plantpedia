const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  webpack5: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  i18n: {
    locales: ['en-US', 'es-MX'],
    defaultLocale: 'en-US',
  }
}

module.exports = withBundleAnalyzer(config)