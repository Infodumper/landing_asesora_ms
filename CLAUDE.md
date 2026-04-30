# Instrucciones para Claude — Landing Asesora MS v2.0

> Extensión del documento maestro `AGENTS.md`. Leer primero ese archivo para contexto completo.

## Contexto Rápido

Este proyecto es una **landing page estática** para Mercedes Saucedo (MS Bellass), desplegada en **Vercel**. No hay backend PHP, no hay base de datos, no hay panel administrativo.

**Stack**: HTML + Tailwind CSS (CDN) + JS Vanilla + Vercel Serverless (Node.js) + Google Drive API.

## Prioridades de Claude

1. **Antes de tocar código**: Leer `AGENTS.md` y la directiva correspondiente en `/directives/`.
2. **Estilos**: Siempre consultar `styles/colores.css` antes de usar colores hex directos.
3. **Configuración**: Datos de contacto y marca viven en `js/config.js`. No hardcodear.
4. **Contenido**: El sistema CMS usa `assets/content.md` + `js/ui-sync.js`. Priorizar ese flujo.
5. **Idioma**: La UI debe estar en español rioplatense. Variables técnicas pueden ser en inglés.

## Skills Disponibles

| Skill | Cuándo usarla |
|:---|:---|
| `page_builder` | Crear o modificar páginas HTML |
| `style_manager` | Cambios de colores, tipografías, componentes CSS |
| `carousel_manager` | Modificar el carrusel del Hero (5 slides, clones, dots) |
| `catalog_integrator` | Problemas con la API de Google Drive |
| `content_sync` | Actualizar textos via el CMS Markdown |
| `config_manager` | Cambios de teléfono, nombre, redes sociales |
| `deploy_auditor` | Verificación post-deploy |

## Reglas Críticas

- **Subplacas**: Todo listado debe estar en tarjetas blancas con `rounded-[1.5rem]`, `shadow-sm`.
- **Inline Styles**: Prohibidos. Usar variables CSS o clases Tailwind.
- **SEO**: Un `<h1>` por página. Meta descriptions obligatorias.
- **Imágenes**: `loading="lazy"` excepto Hero.

---

© 2026 Kaizuna — Gestion SB Standard v2.0
