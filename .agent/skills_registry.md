# Skills Registry — Landing Asesora MS v2.0

Skills disponibles para los agentes dentro de este proyecto. Consultar este registro antes de ejecutar cualquier acción.

---

## Skill: page_builder
**Descripción**: Crear o modificar páginas HTML del sitio.
**Cuándo usar**: Cuando se solicite una nueva sección, página, o cambio estructural en el HTML.
**Entrada**: Requerimiento del usuario + directiva correspondiente.
**Salida**: Archivo HTML en la subcarpeta correspondiente o modificación de `index.html`.
**Directivas asociadas**: `directives/build_system.md`, `directives/build_*.md`
**Restricciones**:
- Respetar la Regla de las Subplacas.
- Mantener un solo `<h1>` por página.
- Usar Tailwind CSS, nunca inline styles.

---

## Skill: style_manager
**Descripción**: Gestionar paleta de colores, tipografías y componentes CSS globales.
**Cuándo usar**: Cuando el usuario solicite cambios visuales (colores, fuentes, sombras, efectos).
**Archivos clave**: `styles/colores.css`, `styles/main.css`
**Workflow**: `.agent/workflows/fix_styles.md`
**Restricciones**:
- Verificar `colores.css` antes de usar hex directos.
- Extender Tailwind config en el `<head>` si se necesitan nuevas utilidades.

---

## Skill: carousel_manager
**Descripción**: Mantener el carrusel infinito del Hero.
**Cuándo usar**: Agregar/quitar slides, ajustar timing, corregir bugs de navegación.
**Archivos clave**: `index.html` (sección Hero + script inline del carrusel)
**Parámetros actuales**:
- 5 slides reales (0-4) + 2 clones para loop infinito.
- TOTAL = 5.
- Timer de autoplay: 8000ms.
- Transición: 0.7s cubic-bezier.

---

## Skill: catalog_integrator
**Descripción**: Configurar y mantener la integración con Google Drive.
**Cuándo usar**: Problemas con carga de catálogos, nuevas categorías, cambios en carpetas de Drive.
**Archivos clave**: `api/get-catalogs.js`, `.env.example`
**Directiva**: `directives/setup_drive.md`
**Variables de entorno**:
- `GOOGLE_DRIVE_FOLDER_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON`

---

## Skill: content_sync
**Descripción**: Gestionar el sistema de contenido dinámico via Markdown.
**Cuándo usar**: Actualizar textos de la UI sin tocar el HTML directamente.
**Archivos clave**: `assets/content.md`, `js/ui-sync.js`
**Flujo**: Editar `content.md` → `ui-sync.js` parsea los bloques `## clave` → inyecta en `data-content`.

---

## Skill: config_manager
**Descripción**: Administrar configuración centralizada de marca y contacto.
**Cuándo usar**: Cambio de teléfono, nombre de marca, links de redes sociales.
**Archivos clave**: `js/config.js`
**Nota**: Los datos de `config.js` se aplican automáticamente a elementos con `data-config` y `data-config-attr`.

---

## Skill: deploy_auditor
**Descripción**: Validar integridad del sitio post-despliegue.
**Cuándo usar**: Después de un deploy significativo o cuando algo se vea roto en producción.
**Workflow**: `.agent/workflows/audit_deploy.md`
**Checks**: SEO (h1 duplicados, meta), APIs (Drive), estilos (colores.css).