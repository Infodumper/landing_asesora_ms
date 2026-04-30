# Context Loader — Landing Asesora MS v2.0

Antes de ejecutar cualquier tarea, el agente debe cargar los siguientes archivos:

1. **`AGENTS.md`** — Arquitectura general, identidad, stack y módulos.
2. **`.agent/skills_registry.md`** — Skills disponibles y cuándo usarlas.
3. **La directiva correspondiente** en `/directives/` según el módulo a intervenir.

Estos archivos definen:
- La arquitectura real del proyecto (landing estática + Vercel serverless).
- Las skills implementadas y sus archivos clave.
- Las reglas de desarrollo y estándares visuales.

## Archivos complementarios (cargar si es necesario):
- `.agent/architecture_registry.md` — Detalle de componentes.
- `.agent/conventions.md` — Estándares de código.
- `.agent/memory_policy.md` — Reglas de uso de Engram.