/**
 * index-logic.js — Lógica específica de la página principal
 * Extraído para cumplir con CSP (No inline scripts)
 */

// ─── Tailwind Config ──────────────────────────────────────
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#BE185D',
                secondary: '#FB7185',
                brandText: '#1F2A37',
                brandSubtext: '#4B5563',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                serif: ['Libre Baskerville', 'serif'],
                brand: ['Great Vibes', 'cursive'],
            },
        }
    }
};

// ─── Vercel Speed Insights ────────────────────────────────
window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

// ─── Header con efecto scroll ─────────────────────────────
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('header-scrolled', window.scrollY > 20);
    }, { passive: true });
}

// ─── Carrusel Infinito ────────────────────────────────────
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (!track || !prevBtn || !nextBtn) return;

    const TOTAL = 5;
    let current = 1;
    let busy = false;
    let autoTimer;

    function goTo(idx, instant = false) {
        track.style.transition = instant ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(-${idx * 100}%)`;
        const dotIdx = idx === 0 ? TOTAL - 1 : idx > TOTAL ? 0 : idx - 1;
        dots.forEach((d, i) => {
            d.classList.toggle('bg-white', i === dotIdx);
            d.classList.toggle('bg-white/40', i !== dotIdx);
        });
    }

    track.addEventListener('transitionend', () => {
        busy = false;
        if (current >= TOTAL + 1) { current = 1; goTo(current, true); }
        if (current <= 0) { current = TOTAL; goTo(current, true); }
    });

    function slide(dir) {
        if (busy) return;
        busy = true;
        current += dir;
        goTo(current);
    }

    nextBtn.addEventListener('click', () => { slide(1); resetAuto(); });
    prevBtn.addEventListener('click', () => { slide(-1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        current = i + 1; goTo(current); resetAuto();
    }));

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => slide(1), 8000);
    }
    resetAuto();
}

// ─── Ribbon Infinito ──────────────────────────────────────
function initRibbon() {
    const ribbon = document.getElementById('ribbon-scroll');
    const track = document.getElementById('ribbon-track');
    const set = document.getElementById('ribbon-set');
    if (!ribbon || !track || !set) return;

    track.appendChild(set.cloneNode(true));
    track.appendChild(set.cloneNode(true));

    ribbon.addEventListener('scroll', () => {
        const gap = parseInt(getComputedStyle(track).gap) || 24;
        const setWidth = set.offsetWidth + gap;
        if (ribbon.scrollLeft >= setWidth * 2) ribbon.scrollLeft -= setWidth;
        if (ribbon.scrollLeft <= 0) ribbon.scrollLeft += setWidth;
    }, { passive: true });
}

// ─── Menú Móvil ───────────────────────────────────────────
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const menu = document.getElementById('mobile-menu');
    if (!menuBtn || !closeBtn || !menu) return;

    const links = menu.querySelectorAll('.mobile-link');
    const toggle = () => menu.classList.toggle('translate-x-full');
    menuBtn.addEventListener('click', toggle);
    closeBtn.addEventListener('click', toggle);
    links.forEach(l => l.addEventListener('click', toggle));
}

// ─── Telemetría ──────────────────────────────────────────
const SB_Telemetry = {
    log(type, data) {
        console.log(`[SB-TELEMETRY] ${type.toUpperCase()}:`, {
            timestamp: new Date().toISOString(),
            type, path: location.pathname, data
        });
    },
    init() {
        window.onerror = (msg, url, line) => this.log('error', { msg, url, line });
        document.querySelectorAll('a[id], button[id]').forEach(el => {
            el.addEventListener('click', e => {
                this.log('interaction', {
                    id: e.currentTarget.id,
                    label: e.currentTarget.innerText?.substring(0, 30)
                });
            });
        });
        this.log('lifecycle', { event: 'load' });
    }
};

// ─── Función Próximamente ───────────────────────────────
function proximamente() {
    if (typeof Swal === 'undefined') return;
    Swal.fire({
        title: '¡Próximamente!',
        text: 'Estamos trabajando para brindarte el mejor servicio en esta sección. ¡Volvé a visitarnos pronto!',
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#f48c42',
        customClass: {
            popup: 'rounded-[2rem]',
            confirmButton: 'rounded-full px-8 py-3 font-bold uppercase tracking-widest text-xs'
        }
    });
}

// ─── Inicialización Dinámica de Carrusel ──────────────────
async function initDynamicCarousel() {
    try {
        const response = await fetch('/api/get-catalogs');
        const result = await response.json();
        if (result.status === 'success' && result.data && result.data.carousel) {
            result.data.carousel.forEach((img) => {
                const num = img.order;
                if (img.url && num && num <= 4) {
                    const elements = document.querySelectorAll(`img[id*="carousel-img-${num}"], img[id*="carousel-img-clone-${num}"]`);
                    elements.forEach(el => {
                        if (img.url.startsWith('http')) {
                            el.src = img.url;
                        }
                    });
                }
            });
            console.log('✅ Carrusel sincronizado con Drive');
        }
    } catch (error) {
        console.warn('⚠️ No se pudo cargar el carrusel dinámico:', error);
    }
}

// ─── Ejecución al Cargar ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initCarousel();
    initRibbon();
    initMobileMenu();
    SB_Telemetry.init();
    initDynamicCarousel();
});
