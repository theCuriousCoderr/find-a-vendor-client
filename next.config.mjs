/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fastly.picsum.photos',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'pixabay.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
