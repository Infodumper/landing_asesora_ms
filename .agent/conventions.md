# Coding Conventions — Landing Asesora MS v2.0

Estándares de desarrollo para mantener la coherencia en todo el sitio.

## Estilo de Código
- **Nomenclatura**: `snake_case` para nombres de archivos y carpetas. `camelCase` para variables JS.
- **Idioma**: UI y comentarios en **Español**. Variables técnicas pueden ser en inglés.
- **Indentación**: 4 espacios.
- **Comillas**: Simples en JS, dobles en atributos HTML.

## Arquitectura
- **Serverless First**: Lógica dinámica (Drive API) únicamente en `/api/*.js` como funciones Node.js.
- **Separación de capas**: No mezclar lógica de servidor en el HTML.
- **Seguridad**: Nunca exponer credenciales en el cliente. Usar `process.env` + secretos de Vercel.
- **Validación**: Validar formatos de entrada en las funciones de la API.

## UI / UX (Tailwind)
- **Paleta**: Usar tokens definidos en la config de Tailwind (`primary`, `secondary`, `brandText`, `brandSubtext`).
- **Variables CSS**: Consultar `styles/colores.css` antes de usar hex directos.
- **Subplacas**: Todo listado en tarjetas blancas, `rounded-[1.5rem]`, `shadow-sm`.
- **Componentes reutilizables**: Usar clases definidas en `styles/main.css` (glass-header, icon-mask, etc.).
- **Feedback al usuario**: SweetAlert2 para confirmaciones y errores.
- **Inline styles**: Prohibidos salvo excepciones justificadas (mask-image en SVG).

## Configuración Centralizada
- **Datos de marca**: `js/config.js` (teléfono, nombre, WhatsApp).
- **Contenido editable**: `assets/content.md` (CMS estático).
- **Variables de entorno**: Documentar en `.env.example`.
