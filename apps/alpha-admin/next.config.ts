import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@levelupid/ui',
    '@levelupid/types',
    '@levelupid/api-client',
    '@levelupid/query-client',
    '@levelupid/auth',
    '@levelupid/utils',
  ],
}

export default nextConfig
