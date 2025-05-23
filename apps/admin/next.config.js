/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swadhesi-ecom-nerdboi-categoryproductsimagesbucket-rxzadvwb.s3.ap-south-1.amazonaws.com',
        port: '',
      }
    ]
  }
  
};
export default nextConfig;
