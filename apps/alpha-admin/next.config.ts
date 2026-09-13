import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  transpilePackages: [
    '@levelupid/ui',
    '@levelupid/types',
    '@levelupid/api-client',
    '@levelupid/query-client',
    '@levelupid/auth',
    '@levelupid/utils',
  ],
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/default',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
