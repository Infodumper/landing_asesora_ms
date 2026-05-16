/**
 * joyas.js — Lógica de la página de joyas
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
function initJoyas() {
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

    // Cerrar con tecla Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.closeCatalog();
    });

    // Worker de PDF.js
    if (window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    }

    // Triggers de Catálogo
    document.querySelectorAll('.catalog-viewer-trigger').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const pdfPath = link.getAttribute('data-pdf');
            const title   = "Joyas y Semijoyas";
            if (pdfPath && pdfPath !== '#') {
                window.openCatalog(pdfPath, title);
            }
        });
    });

    // 3. Navegación de Productos (Arrows)
    const promoScroll = document.getElementById('promo-scroll');
    const promoPrev   = document.getElementById('promo-prev');
    const promoNext   = document.getElementById('promo-next');

    if (promoScroll && promoPrev && promoNext) {
        const scrollAmount = 300;
        promoNext.addEventListener('click', () => {
            promoScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        promoPrev.addEventListener('click', () => {
            promoScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // Fallback miniatura PDF
    generatePdfThumbnail('../assets/docs/perla_negra.pdf', 'img-joyas');
}

async function generatePdfThumbnail(pdfPath, imgId) {
    if (!window.pdfjsLib) return;
    try {
        const img = document.getElementById(imgId);
        if (!img) return;
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
        img.src = canvas.toDataURL();
    } catch (e) {
        console.error('Error generating thumbnail:', e);
    }
}

// ─── Ejecución ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initJoyas();
});
