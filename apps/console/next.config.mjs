/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['@packages/ui', '@packages/core', '@packages/react-hooks', '@packages/react-ui'],
}

export default nextConfig
