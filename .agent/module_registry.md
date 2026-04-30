# Module Registry — Landing Asesora MS v2.0

Módulos funcionales del sitio. Consultar antes de crear nuevas páginas para evitar duplicaciones.

---

## Módulo: Home

**Ubicación**: `index.html`

**Componentes**:
- Hero Carrusel Infinito (5 slides + 2 clones)
- Ribbon de Servicios (7 iconos: Destacados, Asesoría, Talleres, Maquillaje, Glitter Bar, Joyas)
- Productos Destacados (scroll horizontal + motor de carrito SB_Cart)
- Sobre Mí (perfil + texto)
- Testimonios (tarjetas horizontales scrollables)
- Formulario de Contacto (envía a WhatsApp)
- Footer (contacto + redes + Kaizuna)

---

## Módulo: Asesoría de Imagen

**Ubicación**: `asesoria-imagen/index.html`

**Función**: Presentación de servicios de asesoría de imagen personalizada.

---

## Módulo: Talleres y Experiencias

**Ubicación**: `talleres-experiencias/index.html`

**Función**: Información sobre workshops, eventos formativos y experiencias grupales.

---

## Módulo: Maquillaje

**Ubicación**: `maquillaje/index.html`

**Función**: Servicios de maquillaje social y artístico.

**Subsecciones**:
- Maquillaje Social
- Maquillaje Artístico
- **Glitter Bar** (ancla: `#glitter-bar`)

---

## Módulo: Joyas y Semijoyas

**Ubicación**: `joyas/index.html`

**Función**: Catálogo Perla Negra + sección de incorporación para emprendedoras.

**Subsecciones**:
- Catálogo de joyas (PDF viewer)
- Sumarse al equipo (ancla: `#sumate`)

---

## Módulo: Productos de Belleza

**Ubicación**: `productos-belleza/index.html`

**Función**: Visor de catálogos multimarca cargados desde Google Drive.

**Marcas**: Natura, Avon, Mary Kay, Bagués, Millanel.

**Integración**: `api/get-catalogs.js` filtra PDFs por nombre de marca.

---

## Módulo: Login

**Ubicación**: `login.html`

**Estado**: Placeholder. Autenticación temporal en frontend (NO producción).

**Nota**: Este módulo NO tiene backend real. Es un prototipo visual.