# Workflow: Ajuste de Estilos Globales

Este workflow se utiliza cuando el usuario solicita cambios visuales (colores, fuentes, sombras).

## Procedimiento

1.  **Analizar el Target**: Identificar si el cambio es local (una sola sección) o global (afecta a toda la landing).
2.  **Consulta de Colores**: Leer `styles/colores.css`. Está PROHIBIDO usar colores `hex` directamente en el HTML si ya existen variables CSS.
3.  **Implementación Tailwind**: Si el cambio requiere nuevas clases de utilidad, extender la configuración `tailwind.config` en el encabezado del `index.html`.
4.  **Validación Mobile-First**: Probar el cambio en un simulador de pantalla pequeña (Smartphone).
5.  **Clean-up**: Remover cualquier estilo "inline" redundante que haya quedado de pruebas previas.
