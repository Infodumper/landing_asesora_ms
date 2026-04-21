# SOP: Vinculación Google Drive & Vercel (Catálogos)

Este documento detalla el procedimiento para otorgar permisos y configurar el sistema de automatización de catálogos.

## 1. Google Drive (Permisos)

Para que el backend pueda leer los archivos, se debe autorizar a la **Service Account**:

1. Abrir el archivo `service-account.json` (o similar) que descargaste de Google Cloud.
2. Copiar el valor de `"client_email"` (ej: `nombre-servicio@proyecto.iam.gserviceaccount.com`).
3. En la carpeta de Drive "Catálogos", hacer clic en **Compartir**.
4. Pegar el email de la Service Account y asignarle el rol de **Lector** (Viewer).
    - *Nota: Aunque la carpeta sea "Pública con enlace", compartirla directamente con el mail de la cuenta asegura el acceso estable vía API.*

## 2. Vercel (Configuración)

Se deben cargar las siguientes Variables de Entorno en el Dashboard de Vercel (Project -> Settings -> Environment Variables):

| Variable | Valor / Origen |
| :--- | :--- |
| `GOOGLE_DRIVE_FOLDER_ID` | `18_9_zlE5K-U9al9giehzHx5ambPcs5G4` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | El contenido completo y literal del archivo `.json` de la Service Account. |

## 3. Verificación

Una vez configurado, el endpoint `/api/get-catalogs` debería devolver un JSON con la lista de PDFs detectados.

---
**Skill Asociada:** `catalog_manager`
**Directiva Relacionada:** `directives/build_system.md`
