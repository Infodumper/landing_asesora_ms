# Directiva: build_beauty.md — Módulo Productos de Belleza

Define la arquitectura del visor de catálogos multimarca.

## 1. Arquitectura de Datos (Skill: catalog_integrator)

El sistema procesa dinámicamente los archivos de Drive mediante el endpoint `/api/get-catalogs`.

- **Mapeo de Categorías**:
  - `natura`: Filtrado por palabra clave "natura".
  - `avon`: Filtrado por palabra clave "avon".
  - `marykay`: Filtrado por "mary" o "kay".
  - `bagues`: Filtrado por "bagues".
  - `millanel`: Filtrado por "millanel".

## 2. Interfaz de Catálogo (Subplacas)

- **Grid Layout**: Diseño responsivo de tarjetas blancas (`rounded-[1.5rem]`, `shadow-sm`).
- **Thumbnails**:
  1. Intentar cargar imagen de portada (ej: `natura.jpg`).
  2. Si no existe, usar miniatura del PDF por Drive API.
  3. Fallback: Generación local vía `pdf.js`.

## 3. Visor de PDF

- Acceso al catálogo mediante modal con iframe.
- Botón de cierre ("X") únicamente en el encabezado del modal.

---
**Skills Asociadas**: `catalog_integrator`, `page_builder`
