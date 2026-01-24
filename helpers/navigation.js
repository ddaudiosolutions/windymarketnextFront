/**
 * Helper de navegación para uso en Redux slices
 *
 * DEUDA TÉCNICA: Esta solución usa window.location.href en lugar de Next.js router.push()
 * porque los Redux slices no pueden usar hooks de React.
 *
 * TODO: Refactorizar para mover la navegación a los componentes y eliminar este helper
 *
 * @param {string} url - URL de destino
 */
export const navigateTo = (url) => {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};
