/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  transpilePackages: ['@packages/ui', '@packages/core', '@packages/react-hooks', '@packages/react-ui'],
}

export default nextConfig
