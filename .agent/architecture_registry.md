# Architecture Registry — Landing Asesora MS v2.0

Arquitectura del proyecto. Los agentes deben leer este archivo antes de crear o modificar componentes.

---

## Arquitectura General

Landing page estática multi-sección desplegada en Vercel con una función serverless para integración con Google Drive.

**No hay**: base de datos, panel admin, PHP, frameworks JS, backend persistente.

---

## Componentes Principales

### Frontend Estático
- **Ubicación**: Raíz del proyecto + subcarpetas por sección.
- **Tecnología**: HTML + Tailwind CSS (CDN) + JS Vanilla.
- **Páginas**:
  - `index.html` — Home (Hero, Ribbon, Productos, Sobre Mí, Testimonios, Contacto)
  - `asesoria-imagen/` — Asesoría de Imagen
  - `talleres-experiencias/` — Talleres y Experiencias
  - `maquillaje/` — Maquillaje Social y Artístico + Glitter Bar
  - `joyas/` — Joyas y Semijoyas (Perla Negra)
  - `productos-belleza/` — Catálogos Multimarca
  - `login.html` — Acceso al panel (placeholder, sin backend real)

### API Serverless
- **Ubicación**: `api/get-catalogs.js`
- **Runtime**: Node.js (Vercel Functions)
- **Función**: Conecta con Google Drive via Service Account para listar catálogos PDF e imágenes dinámicas.
- **Dependencia**: `googleapis` (npm)

### Sistema de Configuración
- **`js/config.js`**: Datos de marca (nombre, teléfono, WhatsApp, redes).
- **`assets/content.md`**: CMS estático en formato Markdown.
- **`js/ui-sync.js`**: Parser que inyecta contenido del Markdown en elementos `data-content`.

### Estilos Globales
- **`styles/colores.css`**: Variables CSS de la paleta.
- **`styles/main.css`**: Componentes reutilizables (glass-header, icon-mask, etc.).

---

## Flujo de Desarrollo

1. Identificar la skill adecuada en `skills_registry.md`.
2. Leer la directiva correspondiente en `/directives/`.
3. Implementar respetando `conventions.md`.
4. Verificar que no se rompan estilos globales (`colores.css`).
5. Registrar cambios significativos en memoria (Engram).