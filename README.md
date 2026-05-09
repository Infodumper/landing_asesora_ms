# MS Bellass — Mercedes Saucedo

<div align="center">
  <img src="assets/img/logos/logo_sin_fondo.png" alt="MS Bellass Logo" width="200">
  <br>
  <strong>Asesoría de Imagen • Maquillaje • Joyas & Semijoyas</strong>
  <br>
  <em>"Tu imagen habla antes que vos, aprendé a usarla a tu favor"</em>
</div>

---

## Descripción del Proyecto

Plataforma digital desarrollada para la marca **MS Bellass** de Mercedes Saucedo. Esta landing page está diseñada bajo estándares de alta calidad estética y funcional, proporcionando una experiencia optimizada para la exhibición de servicios profesionales, catálogos digitales y captación de clientes.

La plataforma centraliza las operaciones de asesoría de imagen, talleres formativos, servicios de maquillaje y la red de emprendedoras de Perla Negra en Mar del Plata, Argentina.

## Características Principales

-   **Diseño Institucional**: Interfaz basada en el sistema de "Subplacas", con estética minimalista, sombras suaves y componentes visuales refinados.
-   **Gestión de Contenidos (CMS)**: Sistema de actualización mediante Markdown (`assets/content.md`), permitiendo modificaciones de texto rápidas sin intervención en el código fuente.
-   **Integración de Catálogos**: Visualización dinámica de catálogos multimarca mediante la API de Google Drive, asegurando que el material esté siempre actualizado.
-   **Sistema de Pedidos (SB_Cart)**: Motor de carrito integrado que permite a los usuarios gestionar sus selecciones y canalizar pedidos directamente vía WhatsApp.
-   **Rendimiento y SEO**: Arquitectura optimizada para tiempos de respuesta mínimos, accesibilidad y cumplimiento de buenas prácticas de indexación.
-   **Arquitectura Mobile-First**: Interfaz totalmente responsiva adaptada a dispositivos móviles con navegación táctil fluida.

## Stack Tecnológico

-   **Lenguajes**: HTML5, Vanilla JavaScript (ES6+).
-   **Framework de Estilos**: Tailwind CSS (CDN) con extensiones de configuración personalizadas.
-   **Infraestructura**: Vercel Serverless Functions.
-   **Integraciones**: Google Drive API (Service Account).
-   **Tipografía**: Poppins, Libre Baskerville, Great Vibes.

## Estructura del Repositorio

```
landing_asesora_ms/
├── api/                       # Funciones Serverless (Node.js)
├── assets/                    # Recursos y Contenidos
│   ├── content.md             # CMS Centralizado
│   ├── img/                   # Biblioteca de imágenes
│   └── docs/                  # Documentos auxiliares
├── js/                        # Lógica de Aplicación
│   ├── cart.js                # Gestión de carrito
│   ├── ui-sync.js             # Sincronización de datos
│   └── config.js              # Parámetros de marca
├── styles/                    # Definiciones de Estilo
│   ├── colores.css            # Variables de diseño
│   └── main.css               # Estilos globales
└── index.html                 # Punto de entrada principal
```

## Instalación y Despliegue

### Entorno de Desarrollo
1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/Infodumper/landing_asesora_ms.git
    ```
2.  Instalar dependencias necesarias:
    ```bash
    npm install
    ```
3.  Configuración de variables:
    Configurar el archivo `.env` con las credenciales de la **Service Account** de Google Cloud.
4.  Ejecución local:
    ```bash
    vercel dev
    ```

## Actualización de Contenidos

El proyecto utiliza un sistema de sincronización automática. Para modificar textos o precios en el sitio:
1. Acceda al archivo `assets/content.md`.
2. Actualice el valor correspondiente a la clave deseada.
3. Los cambios se verán reflejados en la web en la siguiente carga.

---

<div align="center">
  <p>© 2026 <strong>Kaizuna</strong> — Gestion SB Standard v2.0</p>
  <a href="https://kaizuna.com.ar/" target="_blank">
    <img src="assets/img/logos/logo_Kaizuna.png" alt="Kaizuna Logo" height="30">
  </a>
</div>
