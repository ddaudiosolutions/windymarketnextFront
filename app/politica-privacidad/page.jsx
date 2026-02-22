import React from 'react';
import '../politica-cookies/politica-cookies.css';

export const metadata = {
  title: 'Política de Privacidad - WindyMarket',
  description: 'Política de privacidad y protección de datos de WindyMarket',
};

export default function PoliticaPrivacidad() {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Política de Privacidad</h1>
        <p className="last-updated">Última actualización: Febrero 2026</p>

        <section>
          <h2>1. Información General</h2>
          <p>
            En WindyMarket, nos comprometemos a proteger tu privacidad y tus datos personales.
            Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y
            protegemos tu información personal de acuerdo con el Reglamento General de
            Protección de Datos (RGPD) y la legislación española aplicable.
          </p>

          <div className="info-box">
            <strong>Responsable del tratamiento:</strong>
            <ul>
              <li>Nombre: David Cladera Miralles</li>
              <li>NIF: 43112916Z</li>
              <li>Dirección: C/ Lluis Martí 26, 1º izqda, 07006 Palma de Mallorca, Baleares</li>
              <li>Email: infowindymarket@gmail.com</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>2. ¿Qué datos personales recopilamos?</h2>

          <h3>Datos de registro y cuenta de usuario:</h3>
          <ul>
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Contraseña (encriptada)</li>
            <li>Número de teléfono (opcional)</li>
            <li>Foto de perfil (opcional)</li>
          </ul>

          <h3>Datos de productos y transacciones:</h3>
          <ul>
            <li>Productos que publicas para venta</li>
            <li>Historial de compras y ventas</li>
            <li>Valoraciones y comentarios</li>
            <li>Favoritos y productos guardados</li>
          </ul>

          <h3>Datos de navegación:</h3>
          <ul>
            <li>Dirección IP</li>
            <li>Tipo de navegador y dispositivo</li>
            <li>Páginas visitadas y tiempo de permanencia</li>
            <li>Fecha y hora de acceso</li>
          </ul>

          <h3>Datos de comunicación:</h3>
          <ul>
            <li>Mensajes enviados a otros usuarios</li>
            <li>Consultas al servicio de atención al cliente</li>
          </ul>
        </section>

        <section>
          <h2>3. ¿Para qué utilizamos tus datos?</h2>
          <p>Utilizamos tus datos personales para los siguientes fines:</p>

          <h3>Gestión de la cuenta de usuario:</h3>
          <ul>
            <li>Crear y gestionar tu cuenta</li>
            <li>Autenticación y acceso al servicio</li>
            <li>Recuperación de contraseña</li>
          </ul>

          <h3>Prestación del servicio:</h3>
          <ul>
            <li>Publicación y gestión de productos</li>
            <li>Facilitar transacciones entre usuarios</li>
            <li>Comunicación entre compradores y vendedores</li>
            <li>Sistema de favoritos y seguimiento</li>
          </ul>

          <h3>Mejora del servicio:</h3>
          <ul>
            <li>Análisis estadístico del uso de la plataforma</li>
            <li>Personalización de la experiencia de usuario</li>
            <li>Detección y prevención de fraudes</li>
          </ul>

          <h3>Comunicaciones:</h3>
          <ul>
            <li>Notificaciones sobre tu cuenta y actividad</li>
            <li>Respuestas a consultas y soporte técnico</li>
            <li>Información sobre actualizaciones del servicio</li>
          </ul>
        </section>

        <section>
          <h2>4. Base legal para el tratamiento</h2>
          <p>Tratamos tus datos personales basándonos en:</p>
          <ul>
            <li><strong>Ejecución de contrato:</strong> Necesitamos tus datos para prestarte el servicio</li>
            <li><strong>Consentimiento:</strong> Para envío de comunicaciones comerciales</li>
            <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraudes</li>
            <li><strong>Obligación legal:</strong> Para cumplir con requisitos fiscales y legales</li>
          </ul>
        </section>

        <section>
          <h2>5. ¿Con quién compartimos tus datos?</h2>
          <p>
            No vendemos ni alquilamos tus datos personales a terceros. Solo compartimos
            tus datos en las siguientes circunstancias:
          </p>
          <ul>
            <li><strong>Con otros usuarios:</strong> Información necesaria para facilitar transacciones (nombre de usuario, productos en venta)</li>
            <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar la plataforma (hosting, email, analytics)</li>
            <li><strong>Obligaciones legales:</strong> Cuando sea requerido por ley o autoridades competentes</li>
            <li><strong>Procesadores de pago:</strong> Para gestionar transacciones de forma segura</li>
          </ul>
        </section>

        <section>
          <h2>6. ¿Cuánto tiempo conservamos tus datos?</h2>
          <p>
            Conservamos tus datos personales mientras mantengas una cuenta activa en
            WindyMarket. Cuando elimines tu cuenta:
          </p>
          <ul>
            <li>Tus datos de usuario se eliminarán en un plazo de 30 días</li>
            <li>Algunos datos pueden conservarse por obligaciones legales (facturas, historial de transacciones) durante el tiempo requerido por ley</li>
            <li>Datos anonimizados pueden conservarse con fines estadísticos</li>
          </ul>
        </section>

        <section>
          <h2>7. Tus derechos como usuario</h2>
          <p>De acuerdo con el RGPD, tienes los siguientes derechos:</p>

          <ul>
            <li><strong>Derecho de acceso:</strong> Solicitar información sobre qué datos personales tenemos sobre ti</li>
            <li><strong>Derecho de rectificación:</strong> Corregir datos inexactos o incompletos</li>
            <li><strong>Derecho de supresión:</strong> Solicitar la eliminación de tus datos ("derecho al olvido")</li>
            <li><strong>Derecho de limitación:</strong> Solicitar la limitación del tratamiento de tus datos</li>
            <li><strong>Derecho de portabilidad:</strong> Recibir tus datos en formato estructurado</li>
            <li><strong>Derecho de oposición:</strong> Oponerte al tratamiento de tus datos</li>
            <li><strong>Derecho a no ser objeto de decisiones automatizadas:</strong> Incluida la elaboración de perfiles</li>
          </ul>

          <p>
            Para ejercer estos derechos, puedes contactarnos en:{' '}
            <a href="mailto:infowindymarket@gmail.com">infowindymarket@gmail.com</a>
          </p>
        </section>

        <section>
          <h2>8. Seguridad de tus datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger
            tus datos personales:
          </p>
          <ul>
            <li>Encriptación de contraseñas y datos sensibles</li>
            <li>Conexiones seguras mediante HTTPS</li>
            <li>Acceso restringido a datos personales</li>
            <li>Copias de seguridad regulares</li>
            <li>Monitoreo de seguridad continuo</li>
          </ul>
        </section>

        <section>
          <h2>9. Transferencias internacionales</h2>
          <p>
            Tus datos se almacenan en servidores ubicados en la Unión Europea.
            En caso de transferencias fuera de la UE, nos aseguramos de que se
            implementen las garantías adecuadas según el RGPD.
          </p>
        </section>

        <section>
          <h2>10. Menores de edad</h2>
          <p>
            WindyMarket no está dirigido a menores de 18 años. No recopilamos
            intencionadamente datos de menores. Si detectamos que se ha registrado
            un menor, procederemos a eliminar su cuenta y datos.
          </p>
        </section>

        <section>
          <h2>11. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Te
            notificaremos cualquier cambio significativo por email o mediante un
            aviso destacado en la plataforma.
          </p>
        </section>

        <section>
          <h2>12. Contacto y reclamaciones</h2>
          <p>
            Si tienes preguntas sobre esta política o deseas ejercer tus derechos:
          </p>
          <ul>
            <li>Email: <a href="mailto:infowindymarket@gmail.com">infowindymarket@gmail.com</a></li>
            <li>Dirección: C/ Lluis Martí 26, 1º izqda, 07006 Palma de Mallorca, Baleares</li>
          </ul>
          <p>
            También tienes derecho a presentar una reclamación ante la Agencia
            Española de Protección de Datos (AEPD): <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>
          </p>
        </section>
      </div>
    </div>
  );
}
