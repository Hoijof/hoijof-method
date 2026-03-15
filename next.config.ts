import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Vercel builds are expensive; run `pnpm lint` in CI instead of during `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Run `pnpm typecheck` in CI; keep Vercel builds focused on bundling only
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
