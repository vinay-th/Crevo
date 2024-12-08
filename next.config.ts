const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
