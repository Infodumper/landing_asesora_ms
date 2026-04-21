# Directiva: build_beauty.md (Módulo: Productos de Belleza)

Esta directiva define la arquitectura del visor de catálogos multimarca (Natura, Avon, Mary Kay, Bagués, Millanel).

## 1. Arquitectura de Datos (Skill: catalog_manager)
El sistema debe procesar dinámicamente los archivos de Drive mediante el endpoint `/api/get-catalogs`.

- **Mapeo de Categorías**:
  - `natura`: Filtrado por palabra clave "natura".
  - `avon`: Filtrado por palabra clave "avon".
  - `marykay`: Filtrado por "mary" o "kay".
  - `bagues`: Filtrado por "bagues".
  - `millanel`: Filtrado por "millanel".

## 2. Interfaz de Catálogo (Subplacas)
- **Grid Layout**: Diseño responsivo de tarjetas blancas (`sub-placa`).
- **Thumbnail Dynamics**:
  1. Intentar cargar imagen de portada (ej: `natura.jpg`).
  2. Si no existe, usar miniatura autogenerada del PDF por Drive API.
  3. Fallback final: Generación de miniatura vía `pdf.js` en el cliente.

## 3. Visor de PDF (Skill: app_orchestrator)
- El acceso al catálogo debe realizarse mediante un modal (`#catalog-modal`) que contenga un iframe.
- **Header del Modal**: Botón de cierre ("X") únicamente en el encabezado superior derecho.

---
**Skills Asociadas:** 
- `catalog_manager`: Orquestador transaccional CRUD.
- `app_orchestrator`: Gestión de ciclo de vida de iframes y modales.
- `session_guard`: Persistencia de selección de marca.
