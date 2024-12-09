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
      {
        protocol: 'https',
        hostname: 'crevo.vinaythakor-5025.workers.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
