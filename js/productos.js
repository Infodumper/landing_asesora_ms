/**
 * productos.js — Lógica de la página de productos de belleza
 * Extraído para cumplir con CSP (No inline scripts)
 */

window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

// ─── Tailwind Config ──────────────────────────────────────
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary:      '#BE185D',
                secondary:    '#FB7185',
                brandText:    '#1F2A37',
                brandSubtext: '#4B5563',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                serif:   ['Libre Baskerville', 'serif'],
                brand:   ['Dancing Script', 'cursive'],
            },
        }
    }
};

// ─── Init Functions ───────────────────────────────────────
function initProductos() {
    // 1. Header scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header-scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // 2. Visor de Catálogo
    window.openCatalog = function(pdfPath, title) {
        const modal  = document.getElementById('catalog-modal');
        const iframe = document.getElementById('catalog-iframe');
        const dl     = document.getElementById('download-link');
        const h      = document.getElementById('modal-heading');
        if (!modal || !iframe || !dl || !h) return;
        
        let viewerUrl = `../assets/viewer.html?file=${encodeURIComponent(pdfPath)}`;
        
        if (pdfPath.includes('drive.google.com')) {
            iframe.src = pdfPath.replace('/view', '/preview').replace('?usp=drivesdk', '');
        } else {
            iframe.src = viewerUrl;
        }

        dl.href    = pdfPath;
        if (title) h.innerText = `Catálogo: ${title}`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closeCatalog = function() {
        const modal  = document.getElementById('catalog-modal');
        const iframe = document.getElementById('catalog-iframe');
        if (!modal || !iframe) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        iframe.src = '';
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.closeCatalog();
    });

    // 3. Triggers
    document.querySelectorAll('.catalog-viewer-trigger').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const pdfPath = link.getAttribute('data-pdf');
            const title   = link.closest('section')?.querySelector('h3')?.innerText;
            if (pdfPath && pdfPath !== '#') {
                window.openCatalog(pdfPath, title);
            }
        });
    });

    // Worker de PDF.js
    if (window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    }

    // Fallbacks locales
    const fallbacks = {
        'natura':   '../assets/docs/natura_c6.pdf',
        'avon':     '../assets/docs/avon_6_26.pdf',
        'marykay':  '../assets/docs/mary_kay.pdf',
        'bagues':   '../assets/docs/bagues.pdf'
    };

    Object.keys(fallbacks).forEach(cat => {
        const pdfPath = fallbacks[cat];
        const trigger = document.getElementById(`trigger-${cat}`);
        if (trigger) trigger.setAttribute('data-pdf', pdfPath);
        
        generatePdfThumbnail(pdfPath, `img-${cat}`).then(success => {
            if (!success) {
                const img = document.getElementById(`img-${cat}`);
                const mocks = {
                    'natura':  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
                    'avon':    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
                    'marykay': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
                    'bagues':  'https://images.unsplash.com/photo-1512203530485-2550ad34b23a?auto=format&fit=crop&w=600&q=80'
                };
                if (img) img.src = mocks[cat];
            }
        });
    });
}

async function generatePdfThumbnail(pdfPath, imgId) {
    if (!window.pdfjsLib) return false;
    try {
        const img = document.getElementById(imgId);
        if (!img) return false;

        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;
        img.src = canvas.toDataURL();
        return true;
    } catch (e) {
        console.warn(`[PDF-THUMB] No se pudo generar para ${pdfPath}. Usando fallback de imagen.`);
        return false;
    }
}

// ─── Ejecución ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initProductos();
});
