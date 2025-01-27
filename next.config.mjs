import createNextIntlPlugin from 'next-intl/plugin';

/**
 * This file is supported out-of-the-box as ./i18n/request.ts both in the src folder as well as in the project root with the extensions .ts, .tsx, .js and .jsx.
 * 
 * If you prefer to move this file somewhere else, you can optionally provide a path to the plugin
 * 
 * Read more: [Next-Intl Docs: `i18n-request`](https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing#i18n-request)
 */
const PATH_REQUEST_I18N = './src/lib/i18n/request.ts';

const withNextIntl = createNextIntlPlugin(PATH_REQUEST_I18N);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: ''
      }
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'airbnbnew.cybersoft.edu.vn',
        pathname: '*'
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**'
      },
    ]
  }
};

export default withNextIntl(nextConfig);
