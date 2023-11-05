/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/developer-governance',
        destination: 'https://neardevgov.org/',
        permanent: false,
      },
      {
        source: '/edit/:path*',
        destination: '/sandbox/:path*',
        permanent: true,
      },
    ];
  },
  rewrites: async () => [
    {
      source: '/api/segment',
      destination: 'https://api.segment.io/v1/batch',
    },
  ],
};

module.exports = nextConfig;