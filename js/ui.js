/**
 * ui.js — Lógica de Interfaz de Usuario
 * Maneja efectos de scroll, logo dinámico y otros comportamientos visuales.
 */

function initUI() {
    const mainHeader = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');

    if (!mainHeader || !headerLogo) return;

    // Detectar si estamos en la raíz o en una subcarpeta para las rutas de las imágenes
    const isSubpage = window.location.pathname.includes('/maquillaje/') || 
                      window.location.pathname.includes('/joyas/') || 
                      window.location.pathname.includes('/productos-belleza/');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            mainHeader.classList.add('bg-white', 'shadow-md');
            mainHeader.classList.remove('glass-header');
        } else {
            mainHeader.classList.remove('bg-white', 'shadow-md');
            mainHeader.classList.add('glass-header');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al inicio por si ya hay scroll
}

document.addEventListener('DOMContentLoaded', initUI);
