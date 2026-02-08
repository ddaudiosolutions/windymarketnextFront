// Helper para enviar eventos a Google Analytics
// Usa gtag directamente para mejor compatibilidad con Next.js

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, eventParams);
      console.log('📊 Evento GA enviado:', eventName, eventParams);
    } catch (error) {
      console.warn('⚠️ Error al enviar evento GA:', error);
    }
  } else {
    console.warn('⚠️ Google Analytics no está disponible');
  }
};

export const trackLoginButton = () => {
  trackEvent('login_button', {
    category: 'User',
    action: 'Click on Login button',
    label: 'Login_Button'
  });
};

export const trackSendMail = () => {
  trackEvent('sendMail_button', {
    category: 'User',
    action: 'Send mail between users',
  });
};

export const trackProductView = (productId, productTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'product_view', {
      product_id: productId,
      product_title: productTitle,
      page_path: window.location.pathname
    });
    console.log('📊 Vista de producto registrada:', { product_id: productId, product_title: productTitle });
  }
};