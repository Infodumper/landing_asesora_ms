# Coding Conventions

Estándares de desarrollo para asegurar la coherencia en todos los módulos generados por la Software Factory.

## Estilo de Código
- **Nomenclatura**: Usar `snake_case` para nombres de archivos, variables y campos de base de datos.
- **Idioma**: Todo el código de cara al usuario (UI) y comentarios explicativos deben estar en **Español**. Nombres de variables técnicos pueden ser en inglés si es el estándar de la librería.
- **Indentación**: 4 espacios (o tabuladores consistentes con el archivo existente).

## Arquitectura y Lógica
- **Separación de Capas**: Separar la lógica de negocio (Serverless en `/api`) de la capa de presentación (HTML estático).
- **Serverless First**: Toda lógica dinámica (DB, APIs externas como Drive) debe habitar en la carpeta `/api` como funciones independientes de Node.js.
- **Seguridad**: Nunca exponer credenciales en el cliente. Usar `process.env` y secretos de Vercel.
- **Validación de Datos**: Validar formatos de entrada en las funciones de la API antes de procesar solicitudes.

## UI / UX (Tailwind)
- **Modo Oscuro/Claro**: Usar clases de Tailwind que soporten ambos modos.
- **Componentes**: Reutilizar `partials/` para elementos comunes como modales, headers y footers.
- **Feedback**: Usar SweetAlert2 o notificaciones Toast para confirmar acciones del usuario.
