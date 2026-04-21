# Directiva: build_system.md (Módulo: Landing Interface)

Esta directiva rige la construcción y mantenimiento de la página principal (Landing Page) del ecosistema "Gestion SB".

## 1. Objetivo Operativo
Proveer una interfaz de entrada de alto impacto visual, optimizada para dispositivos móviles, que centralice el acceso a las líneas de negocio de la consultora Stefanía Barroso.

## 2. Componentes Críticos

### 2.1. Hero Carousel (Skill: catalog_manager)
- **Origen de datos**: Carpeta principal en Google Drive.
- **Lógica**: Carga imágenes cuyo nombre contenga la palabra "carousel" (ej: `carousel-1.jpg`).
- **Comportamiento**: Rotación automática, soporte para swipe táctil y navegación por puntos (dots).

### 2.2. Ribbon de Navegación (Skin: menu_navigator)
- **Estructura**: Cinta horizontal con 5 botones circulares.
- **Estándar Visual**:
  - Contenedor: `bg-[#F3F4F6]`, `rounded-full`, sombra suave.
  - Iconos: PNGs transparentes colorizados en `#00a876` extraídos de assets locales.
  - Hover: Elevación visual (`-translate-y-1`) y aumento de sombra.
- **Destinos**:
  1. **Promos**: `#productos` (anclaje interno).
  2. **Belleza**: `productos-belleza/` (SPA-like navigation).
  3. **Joyas**: `joyas/`.
  4. **Maquillaje**: `maquillaje/`.
  5. **Peluquería**: `maquillaje/#peluqueria`.

### 2.3. Sistema de Promociones
- Listado horizontal scrollable (`snap-x`) para productos destacados.

## 3. Telemetría y Logs
- Todo error en la carga de catálogos dinámicos debe advertirse en consola con el prefijo `[DRIVE API]`.
- Se requiere fallback a imágenes locales (`assets/img/`) en caso de fallo de red.

---
**Skills Asociadas:** 
- `menu_navigator`: Orquestador SPA y ruteo circular.
- `catalog_manager`: Gestión de assets desde Drive.
- `app_orchestrator`: Gestión de estados de visor y scroll.
