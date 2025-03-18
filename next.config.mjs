/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Deprecated in Next.js 13+. Use remotePatterns instead for more control
        // domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**', // Allows all paths under lh3.googleusercontent.com
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**', // Allows all paths under res.cloudinary.com
            },
        ],
        // Optional: Configure image optimization settings
        minimumCacheTTL: 60, // Cache images for 60 seconds (adjust as needed)
        formats: ['image/webp', 'image/avif'], // Preferred formats for optimization
    },
};

export default nextConfig;