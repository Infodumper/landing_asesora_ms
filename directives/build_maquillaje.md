# Directiva: build_maquillaje.md — Módulo Maquillaje

Rige la estructura de la página de servicios de Maquillaje.

## 1. Arquitectura de Secciones

Cada categoría de servicio habita en su propia tira de visualización independiente:

### 1.1. Maquillaje Social y Artístico
- **Diseño**: Carrusel horizontal con `snap-x snap-mandatory`.
- **Contenedores**: Sub-placas con altura fija para imágenes (`250px`) y `object-cover`.

### 1.2. Glitter Bar (#glitter-bar)
- Sección especial con ancla `#glitter-bar` para deep-linking desde el Ribbon del Home.
- Servicio de maquillaje con glitter para eventos y fiestas.

## 2. Origen de Datos Dinámico (Skill: catalog_integrator)

- El sistema puede consultar subcarpetas en Google Drive:
  - Subcarpeta `/maquillaje`: Imágenes para maquillaje.
  - Subcarpeta `/peluqueria`: Imágenes para peluquería.
- El endpoint `/api/get-catalogs` retorna los arrays filtrados por carpeta.
- **Estado actual**: Imágenes locales. Drive disponible como fallback.

## 3. Navegación por Anclajes

- Acceso directo a secciones mediante fragmentos de URL (`#glitter-bar`, `#peluqueria`).

---
**Skills Asociadas**: `catalog_integrator`, `page_builder`
