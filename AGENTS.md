# Arquitectura y Estándares — Landing Asesora MS v2.0

> Documento maestro de contexto técnico para todos los agentes (Claude, Gemini, Cursor, etc.).
> **Proyecto**: Landing page de Mercedes Saucedo — Asesora de Imagen, Maquillaje y Joyería.
> **Stack**: HTML estático + Tailwind CSS (CDN) + Vercel Serverless + Google Drive API.

---

## 1. Identidad del Proyecto

| Campo | Valor |
|:---|:---|
| **Nombre comercial** | MS Bellass |
| **Titular** | Mercedes Saucedo |
| **Dominio** | mercedessaucedo.com.ar |
| **Repositorio** | github.com/Infodumper/landing_asesora_ms |
| **Hosting** | Vercel (deploy automático desde `main`) |
| **Localización** | Mar del Plata, Argentina |
| **Idioma UI** | Español rioplatense |

---

## 2. Arquitectura de 3 Capas

```
┌─────────────────────────────────────────────┐
│  CAPA 1 — Presentación (Frontend Estático)  │
│  HTML + Tailwind CDN + JS Vanilla           │
│  ├── index.html (Home + Hero Carrusel)      │
│  ├── asesoria-imagen/                       │
│  ├── maquillaje/                            │
│  ├── joyas/                                 │
│  ├── talleres-experiencias/                 │
│  ├── productos-belleza/                     │
│  └── login.html (placeholder)              │
├─────────────────────────────────────────────┤
│  CAPA 2 — API Serverless (Vercel Functions) │
│  └── api/get-catalogs.js                    │
├─────────────────────────────────────────────┤
│  CAPA 3 — Integración Externa              │
│  └── Google Drive API (Service Account)     │
│      Carpeta: catálogos PDF + imágenes      │
└─────────────────────────────────────────────┘
```

---

## 3. Estándares de Frontend

### 3.1. Stack Visual
- **Framework CSS**: Tailwind CSS vía CDN con configuración extendida en cada `<head>`.
- **Fuentes**: Poppins (body), Libre Baskerville (serif/accent), Great Vibes (brand).
- **Paleta (Tokens)**:
  - `primary`: `#BE185D` (Rosa intenso)
  - `secondary`: `#FB7185` (Rosa claro/coral)
  - `brandText`: `#1F2A37` (Texto principal)
  - `brandSubtext`: `#4B5563` (Texto secundario)
- **Hoja global**: `styles/colores.css` (variables CSS) + `styles/main.css` (componentes).

### 3.2. Regla de las Subplacas
Está **prohibido** mostrar datos sueltos o texto flotante. Cada entidad visible debe vivir en su propia **Subplaca**:
- Fondo blanco (`bg-white`)
- Bordes redondeados (`rounded-[1.5rem]`)
- Sombra suave (`shadow-sm`)
- Hover con elevación sutil

### 3.3. Inline Styles
**Prohibidos**. Toda personalización debe ir en `colores.css` como variable CSS o en clases de Tailwind.

### 3.4. Imágenes
- Hero: `loading="eager"` con `fetchpriority="high"`.
- Resto: `loading="lazy"`.
- Formatos preferidos: `.jpeg` optimizado, `.webp` cuando sea posible.

### 3.5. SEO
- Un solo `<h1>` por página.
- Meta description con keywords (Consultora, Belleza, Mar del Plata).
- Open Graph tags en todas las páginas.
- IDs únicos en elementos interactivos.

---

## 4. Módulos del Sitio

### Home (index.html)
- **Hero Carrusel Infinito**: 5 slides con loop mediante clones. Timer de 8s.
- **Ribbon de Servicios**: 7 iconos navegables (Destacados, Asesoría, Talleres, Maquillaje, Glitter Bar, Joyas).
- **Productos Destacados**: Scroll horizontal con motor de carrito (`SB_Cart`).
- **Sobre Mí / Testimonios / Contacto / Footer**.

### Asesoría de Imagen (asesoria-imagen/)
- Página de servicios de asesoría personalizada.

### Talleres y Experiencias (talleres-experiencias/)
- Sección de workshops y eventos formativos.

### Maquillaje (maquillaje/)
- Servicios de maquillaje social y artístico.
- Incluye subsección **Glitter Bar** (ancla `#glitter-bar`).

### Joyas y Semijoyas (joyas/)
- Catálogo Perla Negra + sección de incorporación de emprendedoras.

### Productos de Belleza (productos-belleza/)
- Visor de catálogos multimarca (Natura, Avon, Mary Kay, Bagués, Millanel) desde Google Drive.

---

## 5. Skills (Capacidades del Agente)

Las skills definen **qué sabe hacer** el agente en este proyecto:

| Skill | Descripción | Archivos clave |
|:---|:---|:---|
| `page_builder` | Crear/modificar páginas HTML del sitio respetando estándares de Subplacas y Tailwind | `*/index.html` |
| `style_manager` | Gestionar paleta de colores, tipografías y componentes visuales globales | `styles/colores.css`, `styles/main.css` |
| `carousel_manager` | Mantener el carrusel del Hero (slides, timing, clones, dots) | `index.html` (script inline) |
| `catalog_integrator` | Configurar y mantener la integración con Google Drive para catálogos | `api/get-catalogs.js`, `.env.example` |
| `content_sync` | Gestionar el sistema de contenido dinámico vía Markdown | `js/ui-sync.js`, `assets/content.md` |
| `config_manager` | Administrar configuración centralizada (teléfono, nombre, redes) | `js/config.js` |
| `deploy_auditor` | Validar integridad post-despliegue (SEO, APIs, estilos) | `.agent/workflows/` |

---

## 6. Prácticas de Ingeniería

1. **Reutilización Preventiva**: Antes de crear código nuevo, revisar `/directives/` y la estructura existente.
2. **Centralización de Config**: Teléfono, nombre, marca → `js/config.js`. No hardcodear.
3. **Telemetría**: `SB_Telemetry` registra interacciones y errores en consola. No desactivar.
4. **Seguridad**: Credenciales de API solo en variables de entorno de Vercel. Nunca en el código.
5. **Idioma**: UI en español. Variables internas y sintaxis técnica en inglés.

---

## 7. Árbol Estructural

```
landing_asesora_ms/
├── .agent/                    # Configuración de agentes
│   ├── architecture_registry.md
│   ├── skills_registry.md
│   ├── conventions.md
│   ├── memory_policy.md
│   └── workflows/
├── api/                       # Vercel Serverless Functions
│   └── get-catalogs.js
├── assets/                    # Recursos estáticos
│   ├── content.md             # CMS estático (Markdown)
│   ├── img/                   # Imágenes del sitio
│   └── docs/                  # Documentos auxiliares
├── directives/                # Especificaciones por módulo
├── js/                        # Scripts compartidos
│   ├── config.js              # Configuración centralizada
│   ├── ui-sync.js             # Sincronización de contenido
│   └── ui.js                  # Efectos de UI (scroll, header)
├── styles/                    # CSS global
│   ├── colores.css
│   └── main.css
├── asesoria-imagen/           # Página: Asesoría de Imagen
├── maquillaje/                # Página: Maquillaje + Glitter Bar
├── joyas/                     # Página: Joyas y Semijoyas
├── talleres-experiencias/     # Página: Talleres y Experiencias
├── productos-belleza/         # Página: Catálogos de Belleza
├── index.html                 # Home principal
├── login.html                 # Acceso al panel (placeholder)
└── vercel.json                # Config de deploy
```

---

© 2026 Kaizuna — Gestion SB Standard v2.0
