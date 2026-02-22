import React from 'react';
import './politica-cookies.css';

export const metadata = {
  title: 'Política de Cookies - WindyMarket',
  description: 'Información sobre el uso de cookies en WindyMarket',
};

export default function PoliticaCookies() {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Política de Cookies</h1>
        <p className="last-updated">Última actualización: Febrero 2026</p>

        <section>
          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
            (ordenador, tablet o móvil) cuando visitas un sitio web. Las cookies permiten
            que el sitio web recuerde tus acciones y preferencias durante un período de tiempo.
          </p>
        </section>

        <section>
          <h2>2. ¿Qué cookies utilizamos?</h2>

          <h3>Cookies esenciales (obligatorias)</h3>
          <p>
            Estas cookies son necesarias para el funcionamiento básico del sitio web y
            no pueden ser desactivadas.
          </p>
          <ul>
            <li><strong>Sesión de usuario:</strong> Mantiene tu sesión iniciada mientras navegas</li>
            <li><strong>Autenticación:</strong> Verifica tu identidad</li>
            <li><strong>Seguridad:</strong> Protege contra ataques y fraudes</li>
          </ul>

          <h3>Cookies de funcionalidad</h3>
          <p>
            Permiten recordar tus preferencias y personalizar tu experiencia.
          </p>
          <ul>
            <li><strong>Preferencias:</strong> Idioma, configuración de visualización</li>
            <li><strong>Carrito:</strong> Productos guardados en tu carrito de compra</li>
            <li><strong>Favoritos:</strong> Productos marcados como favoritos</li>
          </ul>

          <h3>Cookies analíticas</h3>
          <p>
            Nos ayudan a entender cómo los usuarios interactúan con el sitio web.
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Análisis de tráfico y comportamiento</li>
            <li><strong>Métricas:</strong> Páginas visitadas, tiempo de permanencia</li>
          </ul>
        </section>

        <section>
          <h2>3. Cookies de terceros</h2>
          <p>
            Algunos servicios externos pueden establecer sus propias cookies:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Para análisis estadístico</li>
            <li><strong>Servicios de pago:</strong> Para procesar transacciones seguras</li>
          </ul>
        </section>

        <section>
          <h2>4. ¿Cómo gestionar las cookies?</h2>
          <p>
            Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas
            las cookies que ya están en tu dispositivo y configurar la mayoría de los
            navegadores para evitar que se instalen.
          </p>

          <h3>Gestión desde tu navegador:</h3>
          <ul>
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
            <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
          </ul>

          <p className="warning">
            ⚠️ Ten en cuenta que deshabilitar las cookies puede afectar la funcionalidad
            del sitio web y algunas características pueden no estar disponibles.
          </p>
        </section>

        <section>
          <h2>5. Duración de las cookies</h2>
          <ul>
            <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierras el navegador</li>
            <li><strong>Cookies persistentes:</strong> Permanecen hasta su fecha de caducidad o hasta que las elimines manualmente</li>
          </ul>
        </section>

        <section>
          <h2>6. Actualización de esta política</h2>
          <p>
            Podemos actualizar esta Política de Cookies ocasionalmente. Te notificaremos
            cualquier cambio publicando la nueva política en esta página y actualizando
            la fecha de "última actualización".
          </p>
        </section>

        <section>
          <h2>7. Contacto</h2>
          <p>
            Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos:
          </p>
          <ul>
            <li>Email: <a href="mailto:infowindymarket@gmail.com">infowindymarket@gmail.com</a></li>
            <li>Dirección: C/ Lluis Martí 26, 1º izqda, 07006 Palma de Mallorca, Baleares</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
