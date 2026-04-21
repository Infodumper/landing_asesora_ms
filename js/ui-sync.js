/**
 * ui-sync.js — Sincronización Automática de Configuración y Contenidos
 * 1. Aplica CONFIG (js/config.js) a data-config.
 * 2. Carga y aplica contenidos desde assets/content.md a data-content.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- 1. Sincronización de Configuración (Global) ---
    if (typeof CONFIG !== 'undefined') {
        document.querySelectorAll('[data-config]').forEach(el => {
            const key = el.getAttribute('data-config');
            if (CONFIG[key]) el.innerText = CONFIG[key];
        });

        document.querySelectorAll('[data-config-attr]').forEach(el => {
            const attrMapping = el.getAttribute('data-config-attr').split(',');
            attrMapping.forEach(mapping => {
                const [attr, key] = mapping.trim().split(':');
                if (CONFIG[key]) el.setAttribute(attr, CONFIG[key]);
            });
        });

        const waLinks = document.querySelectorAll('a[href*="wa.me"]');
        if (CONFIG.whatsappNumber && waLinks.length > 0) {
            waLinks.forEach(el => {
                const currentHref = el.getAttribute('href');
                const newHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${CONFIG.whatsappNumber}`);
                el.setAttribute('href', newHref);
            });
        }
    }

    // --- 2. Sincronización de Contenidos (Markdown) ---
    await syncMarkdownContent();
});

/**
 * Carga el archivo .md, lo parsea y aplica los textos a los elementos data-content.
 */
async function syncMarkdownContent() {
    try {
        // MÉTODO INFALIBLE: Detectar la ruta base desde la ubicación de este mismo script
        const scriptEl = document.querySelector('script[src*="ui-sync.js"]');
        if (!scriptEl) throw new Error('No se pudo encontrar el elemento script de ui-sync.js');
        
        // El .src devuelve la URL absoluta (file:///... o https://...)
        const scriptUrl = scriptEl.src;
        const rootPath = scriptUrl.substring(0, scriptUrl.indexOf('js/ui-sync.js'));
        const contentPath = `${rootPath}assets/content.md`;

        console.log(`[UI-SYNC] Intentando cargar contenidos desde: ${contentPath}`);

        const response = await fetch(contentPath);
        if (!response.ok) throw new Error(`HTTP ${response.status} - Fallo al cargar el archivo`);
        
        const text = await response.text();
        const contentMap = parseMarkdownContent(text);

        console.log('[UI-SYNC] Contenidos procesados:', Object.keys(contentMap));

        let appliedCount = 0;
        document.querySelectorAll('[data-content]').forEach(el => {
            const key = el.getAttribute('data-content');
            if (contentMap[key]) {
                el.innerHTML = contentMap[key];
                appliedCount++;
            }
        });

        // Sincronización de atributos desde el CMS (ej: data-price, data-name para el carrito)
        document.querySelectorAll('[data-content-attr]').forEach(el => {
            const attrMapping = el.getAttribute('data-content-attr').split(',');
            attrMapping.forEach(mapping => {
                const [attr, key] = mapping.trim().split(':');
                if (contentMap[key]) {
                    let value = contentMap[key];
                    // Si es un atributo de precio, extraemos solo los números para el motor del carrito
                    if (attr === 'data-price' || attr.includes('price')) {
                        value = value.replace(/[^0-9]/g, '');
                    }
                    el.setAttribute(attr, value);
                }
            });
        });

        console.log(`[UI-SYNC] Sincronización exitosa. ${appliedCount} elementos vinculados.`);

        // Caso especial: Meta tags
        if (contentMap['meta_description']) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', contentMap['meta_description']);
        }
    } catch (err) {
        console.error('[UI-SYNC] Error en sincronización:', err.message);
    }
}

/**
 * Parseador robusto para el formato:
 * ## clave
 * ...
 * Texto: contenido
 */
function parseMarkdownContent(md) {
    const map = {};
    const blocks = md.split(/^##\s+/m);
    
    blocks.forEach(block => {
        const lines = block.split(/\r?\n/);
        const key = lines[0].trim();
        if (!key) return;

        // Buscamos la línea que contiene "Texto:"
        const textLine = lines.find(l => l.trim().startsWith('Texto:'));
        if (textLine) {
            // Extraer el texto limpiando la etiqueta "Texto:"
            let content = textLine.replace(/^\s*Texto:\s*/, '').trim();
            map[key] = content;
        }
    });
    
    return map;
}

