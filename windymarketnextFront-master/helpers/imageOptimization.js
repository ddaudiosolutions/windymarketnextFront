/**
 * Utilidades para optimización de imágenes de Cloudinary
 */

/**
 * Genera una URL optimizada para imágenes de Cloudinary
 * @param {string} url - URL original de Cloudinary
 * @param {Object} options - Opciones de optimización
 * @param {number} options.width - Ancho máximo de la imagen
 * @param {number} options.height - Alto máximo de la imagen
 * @param {string} options.quality - Calidad de la imagen (auto, best, good, eco, low)
 * @param {string} options.format - Formato de la imagen (auto, webp, jpg, png)
 * @returns {string} URL optimizada
 */
export const getOptimizedCloudinaryUrl = (
  url,
  { width = 800, height, quality = 'auto', format = 'auto' } = {}
) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    'c_limit', // Mantener aspecto ratio
  ]
    .filter(Boolean)
    .join(',');

  return url.replace('/upload/', `/upload/${transformations}/`);
};

/**
 * Genera una URL de thumbnail optimizada
 * @param {string} url - URL original
 * @param {number} size - Tamaño del thumbnail (default: 150)
 * @returns {string} URL del thumbnail
 */
export const getThumbnailUrl = (url, size = 150) => {
  return getOptimizedCloudinaryUrl(url, {
    width: size,
    height: size,
    quality: 'auto',
    format: 'auto',
  });
};

/**
 * Genera URLs responsivas para srcSet
 * @param {string} url - URL original
 * @param {Array<number>} widths - Array de anchos deseados
 * @returns {string} String para srcSet
 */
export const getResponsiveSrcSet = (url, widths = [320, 640, 960, 1280]) => {
  if (!url || !url.includes('cloudinary.com')) {
    return '';
  }

  return widths
    .map((width) => {
      const optimizedUrl = getOptimizedCloudinaryUrl(url, { width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

/**
 * Pre-carga una imagen optimizada
 * @param {string} url - URL de la imagen
 * @param {Object} options - Opciones de optimización
 */
export const preloadImage = (url, options = {}) => {
  if (typeof window === 'undefined') return;

  const optimizedUrl = getOptimizedCloudinaryUrl(url, options);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizedUrl;
  document.head.appendChild(link);
};
