/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },{
        protocol: 'http',
        hostname: "res.cloudinary.com"
      }, {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      }
    ]
  }
};

export default nextConfig;
