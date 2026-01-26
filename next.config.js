console.log('Configuración de Next.js cargada');
console.log('NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

module.exports = {
  trailingSlash: true,
  images: {
    domains: ['res.cloudinary.com'],
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