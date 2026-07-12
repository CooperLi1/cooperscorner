/** @type {import('next').NextConfig} */
const nextConfig = {
  // Overridable so a second dev instance (e.g. an automated preview) can run
  // without fighting the primary `next dev` over the .next lock.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // One-time development prefix invalidates chunks previously served with an
  // incorrect year-long immutable cache policy. Production URLs are unchanged.
  assetPrefix: process.env.NODE_ENV === 'development' ? '/dev-assets' : undefined,
  images: {
    // Modern formats + correct responsive buckets
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    // If you ever serve remote images, add domains/remotePatterns
    // domains: ['your-cdn.example.com'],
  },
  // Long-lived caching for build assets and public images
  async headers() {
    // Development chunks use stable Turbopack URLs and must remain revalidatable
    // or HMR can load an obsolete module graph from the browser cache.
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/image',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // anything you place in /public/images/* gets strong caching
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

module.exports = nextConfig;
