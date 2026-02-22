'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './cookiebanner.css';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya ha aceptado las cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (!cookiesAccepted) {
      // Mostrar el banner después de un pequeño delay para mejor UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    setShowBanner(false);
    // Aquí podrías deshabilitar cookies no esenciales
    console.log('Cookies no esenciales deshabilitadas');
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <div className="cookie-banner-content">
          <div className="cookie-banner-icon">
            🍪
          </div>

          <div className="cookie-banner-text">
            <h3>Este sitio utiliza cookies</h3>
            <p>
              Utilizamos cookies esenciales para el funcionamiento del sitio y cookies
              analíticas para mejorar tu experiencia. Puedes aceptar todas las cookies
              o configurar tus preferencias.
            </p>
            <p className="cookie-banner-link">
              Para más información, consulta nuestra{' '}
              <Link href="/politica-cookies" onClick={() => setShowBanner(false)}>
                Política de Cookies
              </Link>
            </p>
          </div>
        </div>

        <div className="cookie-banner-buttons">
          <button
            onClick={handleReject}
            className="cookie-btn cookie-btn-secondary"
            aria-label="Rechazar cookies no esenciales"
          >
            Solo esenciales
          </button>
          <button
            onClick={handleAccept}
            className="cookie-btn cookie-btn-primary"
            aria-label="Aceptar todas las cookies"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
