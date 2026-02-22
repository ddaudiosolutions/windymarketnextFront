import React from 'react';
import '../politica-cookies/politica-cookies.css';

export const metadata = {
  title: 'Aviso Legal - WindyMarket',
  description: 'Aviso legal de WindyMarket',
};

export default function AvisoLegal() {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Aviso Legal</h1>
        <p className="last-updated">Última actualización: Febrero 2026</p>

        <section>
          <h2>1. Datos Identificativos</h2>
          <p>
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa
            a los usuarios de los datos identificativos del titular de este sitio web:
          </p>

          <div className="info-box">
            <ul>
              <li><strong>Titular:</strong> David Cladera Miralles</li>
              <li><strong>NIF:</strong> 43112916Z</li>
              <li><strong>Domicilio:</strong> C/ Lluis Martí 26, 1º izqda</li>
              <li><strong>Código Postal:</strong> 07006</li>
              <li><strong>Ciudad:</strong> Palma de Mallorca</li>
              <li><strong>Provincia:</strong> Baleares</li>
              <li><strong>País:</strong> España</li>
              <li><strong>Email:</strong> <a href="mailto:infowindymarket@gmail.com">infowindymarket@gmail.com</a></li>
              <li><strong>Sitio web:</strong> windymarket.es</li>
            </ul>
          </div>

          {/* Si es necesario, descomentar las siguientes secciones: */}
          {/*
          <p>
            <strong>Inscripción en el Registro Mercantil:</strong>
            Tomo ____, Folio ____, Hoja ____, Inscripción ____
          </p>
          */}
        </section>

        <section>
          <h2>2. Objeto</h2>
          <p>
            El presente Aviso Legal regula el uso del sitio web WindyMarket (en adelante,
            "la Plataforma"). La navegación por la Plataforma atribuye la condición de
            usuario de la misma e implica la aceptación plena y sin reservas de todas
            y cada una de las disposiciones incluidas en este Aviso Legal.
          </p>
          <p>
            WindyMarket es una plataforma de marketplace que conecta a compradores y
            vendedores particulares, facilitando la compraventa de productos entre usuarios.
          </p>
        </section>

        <section>
          <h2>3. Condiciones de Uso</h2>

          <h3>3.1 Uso Permitido</h3>
          <p>
            El usuario se compromete a utilizar la Plataforma de conformidad con la ley,
            el presente Aviso Legal, los Términos y Condiciones, y cualquier aviso o
            instrucciones puestas en su conocimiento.
          </p>

          <h3>3.2 Uso Prohibido</h3>
          <p>El usuario se compromete a NO:</p>
          <ul>
            <li>Utilizar la Plataforma de manera que cause daños o interrupciones</li>
            <li>Introducir virus, malware o código malicioso</li>
            <li>Intentar acceder a áreas restringidas del sistema</li>
            <li>Recopilar datos de otros usuarios sin autorización</li>
            <li>Usar la Plataforma para actividades ilegales o fraudulentas</li>
            <li>Suplantar la identidad de otros usuarios</li>
            <li>Reproducir, copiar o distribuir contenidos sin autorización</li>
          </ul>
        </section>

        <section>
          <h2>4. Propiedad Intelectual e Industrial</h2>
          <p>
            Todos los contenidos de esta Plataforma (textos, imágenes, diseños, logos,
            código fuente, bases de datos, etc.) son propiedad de WindyMarket o de
            terceros que han autorizado su uso, y están protegidos por las leyes de
            propiedad intelectual e industrial españolas e internacionales.
          </p>

          <h3>4.1 Derechos Reservados</h3>
          <p>
            Quedan reservados todos los derechos de propiedad intelectual e industrial
            sobre los contenidos. Queda expresamente prohibida la reproducción total o
            parcial de cualquier contenido sin autorización previa y por escrito.
          </p>

          <h3>4.2 Uso de Marca</h3>
          <p>
            "WindyMarket" y su logo son marcas registradas. Su uso no autorizado puede
            constituir una violación de las leyes de marcas comerciales.
          </p>

          <h3>4.3 Contenido de Usuarios</h3>
          <p>
            El contenido publicado por los usuarios (descripciones de productos, imágenes,
            comentarios) es responsabilidad exclusiva de quien lo publica. Los usuarios
            garantizan que tienen los derechos necesarios sobre el contenido que publican.
          </p>
        </section>

        <section>
          <h2>5. Responsabilidades y Garantías</h2>

          <h3>5.1 Disponibilidad del Servicio</h3>
          <p>
            WindyMarket no garantiza la disponibilidad y continuidad ininterrumpida de
            la Plataforma. No nos hacemos responsables de interrupciones del servicio
            por mantenimiento, actualizaciones o causas técnicas.
          </p>

          <h3>5.2 Contenido de Terceros</h3>
          <p>
            WindyMarket actúa como intermediario entre usuarios. No somos responsables de:
          </p>
          <ul>
            <li>La veracidad, exactitud o legalidad del contenido publicado por usuarios</li>
            <li>Las transacciones realizadas entre usuarios</li>
            <li>La calidad, seguridad o idoneidad de los productos ofrecidos</li>
            <li>Enlaces a sitios web de terceros</li>
          </ul>

          <h3>5.3 Exclusión de Garantías</h3>
          <p>
            La Plataforma se proporciona "tal cual" sin garantías de ningún tipo, ni
            expresas ni implícitas. No garantizamos que el servicio satisfaga las
            necesidades de los usuarios ni que esté libre de errores.
          </p>

          <h3>5.4 Limitación de Responsabilidad</h3>
          <p>
            En ningún caso WindyMarket será responsable de daños directos, indirectos,
            incidentales o consecuentes derivados del uso o imposibilidad de uso de
            la Plataforma.
          </p>
        </section>

        <section>
          <h2>6. Enlaces a Terceros</h2>
          <p>
            La Plataforma puede contener enlaces a sitios web de terceros. WindyMarket
            no controla ni asume responsabilidad sobre el contenido de sitios web de
            terceros. El acceso a estos sitios se realiza bajo la responsabilidad del
            usuario.
          </p>
        </section>

        <section>
          <h2>7. Protección de Datos Personales</h2>
          <p>
            El tratamiento de datos personales se rige por nuestra{' '}
            <a href="/politica-privacidad">Política de Privacidad</a>, que cumple con
            el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de
            Protección de Datos (LOPD).
          </p>
        </section>

        <section>
          <h2>8. Política de Cookies</h2>
          <p>
            Este sitio web utiliza cookies. Para más información, consulta nuestra{' '}
            <a href="/politica-cookies">Política de Cookies</a>.
          </p>
        </section>

        <section>
          <h2>9. Modificaciones</h2>
          <p>
            WindyMarket se reserva el derecho de modificar este Aviso Legal en cualquier
            momento. Los cambios entrarán en vigor desde su publicación en la Plataforma.
          </p>
          <p>
            Es responsabilidad del usuario revisar periódicamente este Aviso Legal para
            estar informado de posibles cambios.
          </p>
        </section>

        <section>
          <h2>10. Legislación Aplicable y Jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para la
            resolución de cualquier controversia, las partes se someten a los Juzgados
            y Tribunales de Palma de Mallorca, renunciando expresamente
            a cualquier otro fuero que pudiera corresponderles.
          </p>
          <p>
            Para usuarios consumidores dentro de la Unión Europea, esta cláusula no
            afecta a los derechos que puedan corresponderles según la normativa aplicable.
          </p>
        </section>

        <section>
          <h2>11. Comunicaciones</h2>
          <p>
            Para cualquier comunicación relacionada con este Aviso Legal, puedes contactar
            con nosotros:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:infowindymarket@gmail.com">infowindymarket@gmail.com</a></li>
            <li><strong>Dirección postal:</strong> C/ Lluis Martí 26, 1º izqda, 07006 Palma de Mallorca, Baleares</li>
          </ul>
        </section>

        <section>
          <h2>12. Resolución de Litigios en Línea</h2>
          <p>
            De conformidad con el Reglamento (UE) 524/2013, se informa que para la
            resolución alternativa de litigios en línea, los consumidores pueden acceder
            a la plataforma de la Comisión Europea disponible en:{' '}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

        <section>
          <h2>13. Nulidad Parcial</h2>
          <p>
            Si alguna cláusula de este Aviso Legal fuera declarada nula o inaplicable,
            las demás cláusulas permanecerán en vigor sin que queden afectadas por dicha
            declaración de nulidad.
          </p>
        </section>
      </div>
    </div>
  );
}
