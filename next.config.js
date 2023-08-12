/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/uploads/images/:path*',
				destination: 'https://coffee-shop-backend-main.onrender.com/uploads/images/:path*'
			},
			// {
			// 	source: '/api/:path*',
			// 	destination: 'https://coffee-shop-backend-production.up.railway.app/api/:path*',
			// },
		]
	},
}

module.exports = nextConfig
