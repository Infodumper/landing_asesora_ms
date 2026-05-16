/**
 * maquillaje.js — Lógica de la página de maquillaje
 * Extraído para cumplir con CSP (No inline scripts)
 */

window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

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
                brand: ['Dancing Script', 'cursive'],
            },
            borderRadius: {
                'placa': '2.5rem',
                'subplaca': '1.5rem',
            }
        }
    }
};

// ─── Init Functions ───────────────────────────────────────
function initMaquillaje() {
    // Lógica del Carrusel
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth * 0.8, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth * 0.8, behavior: 'smooth' });
        });
    }

    // Efecto reveal al scroll
    const reveals = document.querySelectorAll('.reveal-section');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => observer.observe(reveal));

    // Efecto scroll en header
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('bg-white/95', window.scrollY > 20);
            header.classList.toggle('shadow-sm', window.scrollY > 20);
        }, { passive: true });
    }
}

// ─── Ejecución ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initMaquillaje();
});
