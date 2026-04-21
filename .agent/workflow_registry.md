# Workflow Registry

Este archivo define el flujo estándar que siguen los agentes para garantizar resultados reproducibles y alineados con la arquitectura de Antigravity.

## Flujo Principal (8 Pasos)

1. **Analizar prompt del usuario**: Entender el objetivo final y las restricciones.
2. **Identificar intención**: Determinar si es una creación de módulo, corrección de bug, o consulta de datos.
3. **Buscar skill en `skills_registry.md`**: Localizar el agente especialista adecuado.
4. **Identificar módulo en `module_registry.md`**: Verificar si el módulo afectado ya existe o es nuevo.
5. **Verificar arquitectura**: Consultar `architecture_registry.md` para asegurar consistencia.
6. **Verificar contratos de datos**: Validar en `data_contracts.md` que las estructuras de BD sean respetadas.
7. **Ejecutar workflow correspondiente**: Usar los scripts en `.agent/workflows/`.
8. **Generar o modificar código**: Implementar los cambios siguiendo las `conventions.md`.

---

## Workflows Disponibles

- [audit_deploy.md](file:///c:/TGPN/landing_gestion_sb/.agent/workflows/audit_deploy.md): Validación de integración con APIs y SEO post-despliegue.
- [fix_styles.md](file:///c:/TGPN/landing_gestion_sb/.agent/workflows/fix_styles.md): Procedimiento para cambios estéticos globales.
