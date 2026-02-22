# 📋 Páginas Legales de WindyMarket

Este documento explica las páginas legales implementadas y qué información debes personalizar para cumplir con la legislación española y europea.

## ✅ Páginas Implementadas

Se han creado las siguientes páginas legales obligatorias:

1. **Política de Cookies** - `/politica-cookies`
2. **Política de Privacidad** - `/politica-privacidad`
3. **Términos y Condiciones** - `/terminos-condiciones`
4. **Aviso Legal** - `/aviso-legal`

Además, se ha añadido:
- **Footer actualizado** con enlaces a todas las páginas legales
- **Banner de consentimiento de cookies** (aparece en la primera visita)

## 🔧 Información que DEBES Personalizar

Todas las páginas contienen comentarios `{/* TODO: ... */}` indicando qué información debes actualizar. Busca estos comentarios en los archivos y reemplázalos con tus datos reales.

### Información Principal Requerida:

#### 📌 Datos de la Empresa (para TODAS las páginas):
- **Nombre legal de la empresa/responsable**
- **NIF/CIF**
- **Dirección completa** (calle, número, código postal, ciudad, provincia)
- **Teléfono de contacto**
- **Email de contacto general**
- **Email específico de privacidad** (puede ser el mismo)
- **Email específico de asuntos legales** (puede ser el mismo)
- **Dominio web real**

#### 📌 Datos Adicionales (si aplica):
- **Registro Mercantil** (si tu empresa está registrada)
- **Ciudad/Tribunales** de jurisdicción (normalmente donde está tu sede)

### Archivos a Revisar y Personalizar:

#### 1. Aviso Legal (`app/aviso-legal/page.jsx`)
```
Líneas con TODO:
- Nombre legal completo
- NIF/CIF
- Dirección completa
- Código Postal, Ciudad, Provincia
- Teléfono
- Email
- Dominio web
- Ciudad de jurisdicción
```

#### 2. Política de Privacidad (`app/politica-privacidad/page.jsx`)
```
Líneas con TODO:
- Nombre legal de la empresa
- CIF
- Dirección
- Email de contacto
- Email de privacidad
- Dirección postal
```

#### 3. Términos y Condiciones (`app/terminos-condiciones/page.jsx`)
```
Líneas con TODO:
- Información sobre comisiones/tarifas (si las hay)
- Ciudad de jurisdicción
- Dirección postal
- Email legal
```

#### 4. Política de Cookies (`app/politica-cookies/page.jsx`)
```
Líneas con TODO:
- Email de contacto
```

## 🔍 Cómo Encontrar los TODOs

Puedes buscar todos los TODOs con este comando:

```bash
grep -r "TODO:" app/*legal* app/*cookies* app/*privacidad* app/*terminos*
```

O buscar en tu editor con: `TODO:`

## 📝 Tareas Adicionales Recomendadas

### 1. Revisar el Banner de Cookies
El banner de cookies está en `components/CookieBanner/CookieBanner.jsx`. Puedes personalizar:
- El texto del mensaje
- Los colores (en `cookiebanner.css`)
- El comportamiento (aceptar/rechazar)

### 2. Ajustar Footer
El footer está en `components/WhatsApp/layout/Footer.jsx`. Puedes:
- Cambiar el año si es necesario (actualmente usa el año automático)
- Personalizar el texto "Desarrollado por aunsh" si lo deseas
- Ajustar los estilos en `footer.css`

### 3. Configurar Analytics
Si usas Google Analytics u otras herramientas de tracking:
- Asegúrate de mencionarlas en la Política de Cookies
- Verifica que respetes la decisión del usuario sobre cookies no esenciales

## ⚖️ Importancia Legal

### 🚨 OBLIGATORIO por Ley:
1. **Aviso Legal** - LSSI (Ley de Servicios de la Sociedad de la Información)
2. **Política de Privacidad** - RGPD + LOPD
3. **Política de Cookies** - RGPD + LSSI
4. **Términos y Condiciones** - Muy recomendable para protección legal

### ⚠️ Consecuencias de NO tener estas páginas:
- Multas de hasta 600.000€ por la Agencia Española de Protección de Datos (AEPD)
- Problemas legales con usuarios
- Falta de protección legal en disputas
- Incumplimiento del RGPD

## 🎨 Personalización de Diseño

### Cambiar Colores del Footer
Edita `components/WhatsApp/layout/footer.css`:
```css
.footer {
  background-color: #2c3e50; /* Cambia este color */
}
```

### Cambiar Colores del Banner de Cookies
Edita `components/CookieBanner/cookiebanner.css`:
```css
.cookie-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Cambia el gradiente */
}
```

### Cambiar Estilos de Páginas Legales
Edita `app/politica-cookies/politica-cookies.css` (compartido por todas las páginas legales).

## 📱 Navegación

Las páginas legales son accesibles desde:
1. **Footer** (en todas las páginas)
2. **URLs directas**:
   - `https://tudominio.com/aviso-legal`
   - `https://tudominio.com/politica-privacidad`
   - `https://tudominio.com/politica-cookies`
   - `https://tudominio.com/terminos-condiciones`

## 🔒 Banner de Cookies - Cómo Funciona

El banner de cookies:
1. Se muestra automáticamente en la primera visita
2. Guarda la preferencia en `localStorage`
3. No vuelve a aparecer después de aceptar/rechazar
4. Permite "Solo esenciales" o "Aceptar todas"

### Para Resetear el Banner (testing):
```javascript
// En la consola del navegador:
localStorage.removeItem('cookiesAccepted');
localStorage.removeItem('cookiesAcceptedDate');
// Recarga la página
```

## ✅ Checklist de Implementación

- [ ] Rellenar TODOS los datos de la empresa en las 4 páginas
- [ ] Verificar emails de contacto funcionan
- [ ] Revisar que la ciudad de jurisdicción es correcta
- [ ] Probar que todos los enlaces del footer funcionan
- [ ] Probar el banner de cookies (aceptar y rechazar)
- [ ] Verificar responsive en móvil
- [ ] Revisar ortografía y gramática
- [ ] Consultar con un abogado si tienes dudas (RECOMENDADO)

## 📞 Soporte

Si tienes dudas sobre:
- **Aspectos técnicos**: Revisa el código o contacta con tu desarrollador
- **Aspectos legales**: Consulta con un abogado especializado en derecho digital
- **RGPD/LOPD**: Agencia Española de Protección de Datos (www.aepd.es)

## 🔄 Mantenimiento

Recuerda:
1. **Revisar anualmente** estas políticas
2. **Actualizar** si cambias prácticas de datos
3. **Notificar a usuarios** cambios importantes
4. **Mantener registro** de versiones anteriores

---

**Última actualización de este documento**: Febrero 2026

**IMPORTANTE**: Este es un template genérico. Consulta con un profesional legal para asegurar que cumple con tus necesidades específicas y la legislación vigente.
