/**
 * login.js — Lógica de autenticación y UI del login
 * Extraído para cumplir con CSP (No inline scripts)
 */

// ─── Tailwind Config ──────────────────────────────────────
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary:      '#00a876',
                secondary:    '#d4af37',
                brandText:    '#064e3b',
                brandSubtext: '#4B5563',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                brand:   ['Dancing Script', 'cursive'],
            },
        }
    }
};

// ─── Vercel Speed Insights ────────────────────────────────
window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

// ─── Auth Logic ──────────────────────────────────────────
const SB_Auth = {
    init: () => {
        const form = document.getElementById('login-form');
        if (!form) return;
        
        form.addEventListener('submit', SB_Auth.handleLogin);
        
        // Animación de entrada
        setTimeout(() => {
            const container = document.getElementById('login-container');
            if (container) container.classList.add('translate-y-0', 'opacity-100');
        }, 100);
    },
    handleLogin: async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        if (!btn) return;
        
        const originalText = btn.innerHTML;
        
        // Loading State
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Verificando...</span>
        `;

        // Simulación de Auth (Las credenciales NUNCA deben validarse en el frontend)
        setTimeout(() => {
            const username = document.getElementById('username').value;
            const pass     = document.getElementById('password').value;

            if (username === 'admin' && pass === 'mercedes2026') {
                SB_Auth.onSuccess();
            } else {
                SB_Auth.onError();
                btn.disabled    = false;
                btn.innerHTML   = originalText;
            }
        }, 1500);
    },
    onSuccess: () => {
        if (typeof Swal === 'undefined') return;
        Swal.fire({
            title: '¡Acceso Correcto!',
            text: 'Bienvenida Mercedes. Redirigiendo al panel...',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            background: '#fff',
            color: '#064e3b',
            timerProgressBar: true
        }).then(() => {
            window.location.href = 'index.html';
        });
    },
    onError: () => {
        if (typeof Swal === 'undefined') return;
        Swal.fire({
            title: 'Error de Acceso',
            text: 'Usuario o contraseña incorrectos. Por favor, verificá tus datos.',
            icon: 'error',
            confirmButtonColor: '#064e3b',
            confirmButtonText: 'Reintentar'
        });
    }
};

// ─── Ejecución ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    SB_Auth.init();
});
