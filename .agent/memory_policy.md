# Memory Policy (Engram) — Landing Asesora MS v2.0

Reglas para el uso de memoria persistente. Mantener un contexto de alta calidad entre sesiones.

## Qué Guardar (Prioridad Alta)
- **Decisiones de Diseño**: Por qué se eligió una paleta, una tipografía o un layout específico.
- **Bugfixes**: Qué falló, por qué, y cómo se arregló (ej: carrusel, iconos, responsive).
- **Patrones**: Formas estándar de resolver problemas (ej: Subplacas, CMS Markdown, icon-mask).
- **Configuración**: Cambios en `config.js`, variables de entorno, integraciones.
- **Preferencias del Usuario**: Estilos visuales, idioma, formas de trabajo.

## Qué NO Guardar
- **Prompts temporales**: Consultas exploratorias sin cambios permanentes.
- **Errores de sintaxis**: Typos que se corrigen en el momento.
- **Scripts de prueba**: Archivos en `scratch/` para validaciones rápidas.

## Formato Obligatorio
Usar el formato de `mem_save`:
- **What**: Qué se hizo.
- **Why**: Por qué (motivo técnico o pedido de usuario).
- **Where**: Archivos afectados.
- **Learned**: Aprendizajes clave para el futuro.
