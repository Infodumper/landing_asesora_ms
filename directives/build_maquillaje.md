# Directiva: build_maquillaje.md (Módulo: Servicios Profesionales)

Rige la estructura de la página de servicios de Maquillaje y Peluquería.

## 1. Arquitectura de Tiras Horizontales
Cada categoría de servicio debe habitar en su propia tira de visualización independiente.

- **Diseño**: Carrusel horizontal con `snap-x` y `snap-mandatory`.
- **Contenedores**: Sub-placas con altura fija para imágenes (`250px`) y `object-cover` para los assets dinámicos.

## 2. Origen de Datos Dinámico (Skill: catalog_manager)
- El sistema debe consultar la subcarpeta correspondiente en Google Drive:
  - Subcarpeta `/maquillaje`: Imágenes para la sección de Maquillaje.
  - Subcarpeta `/peluqueria`: Imágenes para la sección de Peluquería.
- **Identificación**: El endpoint `/api/get-catalogs` debe retornar los arrays `maquillaje` y `peluqueria` filtrados por el nombre de la carpeta contenedora.

## 3. Navegación por Anclajes
- Se debe permitir el acceso directo a la sección de Peluquería mediante el fragmento de URL `#peluqueria`.

---
**Skills Asociadas:** 
- `catalog_manager`: Inyección de imágenes dinámicas por subcarpeta.
- `app_orchestrator`: Gestión de carruseles horizontales.
- `premium_attention`: Coordinación de turnos vía WhatsApp.
