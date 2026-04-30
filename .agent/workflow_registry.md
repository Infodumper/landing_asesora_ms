# Workflow Registry — Landing Asesora MS v2.0

Flujos estándar que siguen los agentes para garantizar resultados reproducibles.

## Flujo Principal (5 Pasos)

1. **Analizar el pedido**: Entender el objetivo y las restricciones del usuario.
2. **Identificar módulo**: Consultar `module_registry.md` para saber qué página/sección se modifica.
3. **Buscar skill**: Consultar `skills_registry.md` para localizar la capacidad adecuada.
4. **Leer directiva**: Ir a `/directives/` y leer la especificación del módulo afectado.
5. **Implementar**: Ejecutar los cambios siguiendo `conventions.md`.

---

## Workflows Disponibles

- [audit_deploy.md](.agent/workflows/audit_deploy.md): Validación de integridad post-despliegue (SEO, APIs, estilos).
- [fix_styles.md](.agent/workflows/fix_styles.md): Procedimiento para cambios estéticos globales.
