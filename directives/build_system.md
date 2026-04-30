# Directiva: build_system.md — Módulo Home (Landing Principal)

Rige la construcción y mantenimiento de `index.html`.

## 1. Objetivo

Proveer una interfaz de alto impacto visual, optimizada para móviles, que centralice el acceso a todas las líneas de negocio de Mercedes Saucedo.

## 2. Componentes Críticos

### 2.1. Hero Carrusel Infinito (Skill: carousel_manager)
- **Estructura**: 5 slides reales (0-4) + 2 clones para loop infinito.
- **Slides actuales**:
  - 0: Genérico (bienvenida) → `#servicios`
  - 1: Asesoría de Imagen → `asesoria-imagen/`
  - 2: Talleres y Experiencias → `talleres-experiencias/`
  - 3: Maquillaje → `maquillaje/`
  - 4: Joyas y Semijoyas → `joyas/` + `joyas/#sumate`
- **Parámetros**: TOTAL=5, autoplay 8s, transición 0.7s cubic-bezier.
- **Imágenes**: Locales en `assets/img/portada/carousel_N.jpeg`. Con fallback dinámico desde Drive.

### 2.2. Ribbon de Servicios (Skill: page_builder)
- **Estructura**: Cinta horizontal con 7 botones circulares, scroll infinito con clones.
- **Estándar Visual**:
  - Contenedor: `bg-[#F3F4F6]`, `rounded-full`, sombra soft-shadow.
  - Iconos: PNGs transparentes con `icon-mask` en `--icons-primary`.
  - Hover: Elevación (`-translate-y-1`) + aumento de sombra.
- **Items actuales**:
  1. **Destacados** → `#productos`
  2. **Asesoría de Imagen** → `asesoria-imagen/`
  3. **Talleres y Experiencias** → `talleres-experiencias/`
  4. **Maquillaje** → `maquillaje/`
  5. **Glitter Bar** → `maquillaje/#glitter-bar` (icono SVG con máscara especial)
  6. **Joyas y Semijoyas** → `joyas/`

### 2.3. Productos Destacados (Skill: page_builder)
- Scroll horizontal con `snap-x snap-mandatory`.
- Motor de carrito `SB_Cart` con persistencia en localStorage.
- Envío de pedido via WhatsApp.

### 2.4. Sobre Mí / Testimonios / Contacto
- Formulario de contacto envía a WhatsApp con datos estructurados.
- Testimonios en tarjetas horizontales scrollables.

## 3. Telemetría
- `SB_Telemetry` registra interacciones y errores en consola.
- Errores de Drive API con prefijo `[DRIVE]`.

---
**Skills Asociadas**: `carousel_manager`, `page_builder`, `content_sync`, `config_manager`
