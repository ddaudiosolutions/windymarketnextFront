module.exports = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/productos?busqueda=ultimos_productos&page=0',
        permanent: true,
      },
    ]
  },
}