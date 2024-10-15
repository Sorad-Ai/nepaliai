/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Adding image domains for Next.js Image Optimization
      domains: ['img.icons8.com', 'via.placeholder.com', 'play-lh.googleusercontent.com'],
    },
  
    webpack: (config, { isServer }) => {
      // Add custom Webpack configuration here
      
      // Example: Resolve a custom path or alias
      config.resolve.alias = {
        ...config.resolve.alias,
        // Add your custom aliases or modules here if needed
      };
  
      // If server-side specific changes are needed
      if (isServer) {
        // You can make server-specific Webpack changes here
      }
  
      // Always return the updated config object
      return config;
    },
  
    reactStrictMode: true, // Enable React strict mode
    swcMinify: true,       // Enable SWC minifier for faster builds
  };
  
  export default nextConfig;
  