import Link from 'next/link';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className='footer'>
        <div className='footer-content'>
          {/* Enlaces legales */}
          <div className='footer-legal-links'>
            <Link href='/aviso-legal' className='footer-link'>
              Aviso Legal
            </Link>
            <span className='footer-separator'>|</span>
            <Link href='/politica-privacidad' className='footer-link'>
              Privacidad
            </Link>
            <span className='footer-separator'>|</span>
            <Link href='/politica-cookies' className='footer-link'>
              Cookies
            </Link>
            <span className='footer-separator'>|</span>
            <Link href='/terminos-condiciones' className='footer-link'>
              Términos y Condiciones
            </Link>
          </div>

          {/* Copyright */}
          <div className='footer-copyright'>
            <span>
              {String.fromCodePoint('0X00A9')} {currentYear} WindyMarket
            </span>
            <span className='footer-separator'>•</span>
            <span>Todos los derechos reservados</span>
          </div>

          {/* Powered by (opcional) */}
          <div className='footer-powered'>
            <span>Desarrollado por </span>
            <a
              href='WindyMarket.es'
              target='_blank'
              rel='noreferrer nofollow'
              className='footer-link'
            >
              WindyMarket
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
