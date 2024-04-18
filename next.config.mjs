/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '116.98.119.57',
            port: '',
          },
        ],
        domains: ['116.98.119.57','tomcat.daivo.info.vn'],
      },
};

export default nextConfig;
