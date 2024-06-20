/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "nktgexzeofpxlbirgkvp.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
