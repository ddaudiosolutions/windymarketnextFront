// Helper para enviar eventos a Google Analytics
// Usa gtag directamente para mejor compatibilidad con Next.js

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
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