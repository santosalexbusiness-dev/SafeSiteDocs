/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The /library/[id] page renders per-request (subscription gating), so it
  // reads the Markdown masters at runtime. Next's tracer can't see the dynamic
  // fs paths, so bundle the whole library folder into that serverless function.
  experimental: {
    outputFileTracingIncludes: {
      "/library/[id]": ["./safety-doc-library/**/*"],
    },
  },
  // Allow remote placeholder imagery. Add your real CDN/storage domains here
  // (e.g. your Supabase storage bucket or S3/CloudFront distribution).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Security headers applied site-wide. Tune CSP once you know your
        // exact third-party origins (Stripe, analytics, fonts, etc.).
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
