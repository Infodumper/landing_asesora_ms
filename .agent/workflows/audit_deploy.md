# Workflow: Auditoría de Despliegue y Salud de APIs

Este workflow se ejecuta antes de cada gran cambio o después de un despliegue en Vercel para asegurar que la integración con Google Drive y el SEO estén intactos.

## Pasos de Ejecución

### 1. Validación de Integración Drive
- Inspeccionar el archivo `/api/get-catalogs.js`.
- Verificar que las categorías mapeadas (`joyas`, `belleza`, `mary`, `kay`, `natura`) coincidan con los requerimientos del usuario.
- **Acción**: Consultar el log de consola del navegador en producción para confirmar que no hay errores 500.

### 2. Verificación de UI (Visual Regression)
- Comparar el `index.html` con los lineamientos de `.cursorrules`.
- Confirmar que todos los botones de "Comprar" tengan el `id` o clase necesaria para el Motor de Carrito (`SB_Cart`).

### 3. Check de SEO
- Ejecutar un grep rápido para asegurar que no haya duplicados de `<h1>`.
- Verificar que las etiquetas `<meta description>` incluyan las palabras clave principales (Consultora, Belleza, Mar del Plata).

### 4. Sincronización de Memoria
- Registrar cualquier descubrimiento nuevo sobre la estructura de archivos del usuario en el sistema de memoria (Engram).
