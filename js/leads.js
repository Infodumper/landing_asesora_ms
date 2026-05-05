/**
 * leads.js — Gestión de Captación de Leads · MS Bellass
 * Implementación básica y no invasiva para captación de clientes.
 */

const LeadManager = {
    config: {
        delay: 5000, // 5 segundos
        storageKey: 'ms_lead_captured',
        whatsappBase: 'https://wa.me/5492233453279',
    },

    init() {
        console.log('[LEADS] Inicializando...');
        if (this.isCaptured()) {
            console.log('[LEADS] El usuario ya se registró o cerró el popup.');
            return;
        }

        setTimeout(() => {
            this.showPopup();
        }, this.config.delay);
    },

    isCaptured() {
        return localStorage.getItem(this.config.storageKey) === 'true';
    },

    showPopup() {
        const popup = document.getElementById('lead-popup');
        if (popup) {
            popup.classList.remove('translate-y-[150%]', 'opacity-0');
            popup.classList.add('translate-y-0', 'opacity-100');
        }
    },

    closePopup(permanently = false) {
        const popup = document.getElementById('lead-popup');
        if (popup) {
            popup.classList.add('translate-y-[150%]', 'opacity-0');
            popup.classList.remove('translate-y-0', 'opacity-100');
        }
        if (permanently) {
            localStorage.setItem(this.config.storageKey, 'true');
        }
    },

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const nameInput = form.querySelector('input[placeholder*="nombre"]');
        const contactInput = form.querySelector('input[placeholder*="WhatsApp"]');

        const name = nameInput ? nameInput.value : '';
        const contact = contactInput ? contactInput.value : '';

        if (!name || !contact) {
            Swal.fire({
                title: 'Opps!',
                text: 'Por favor completá los campos.',
                icon: 'warning',
                confirmButtonColor: '#BE185D'
            });
            return;
        }

        // Mostrar loading
        Swal.fire({
            title: 'Enviando...',
            text: 'Estamos procesando tu solicitud',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            // Intentar envío "Invisible" (Serverless API)
            const response = await fetch('/api/save-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    contact,
                    source: form.id || 'popup',
                    message: 'Desea unirse a la comunidad / recibir guía'
                })
            });

            const result = await response.json();

            if (response.ok) {
                // Éxito invisible
                this.onSuccess(true);
            } else {
                throw new Error('API Error');
            }

        } catch (error) {
            console.warn('[LEADS] Error en envío directo, usando WhatsApp como fallback:', error);
            
            // Fallback: WhatsApp (Visible)
            const message = `Hola Merce! Me gustaría sumarme a la comunidad. Mi nombre es ${name}. Mi contacto es ${contact}.`;
            const link = `${this.config.whatsappBase}?text=${encodeURIComponent(message)}`;
            
            this.onSuccess(false, link);
        }
    },

    onSuccess(isSilent, link = null) {
        localStorage.setItem(this.config.storageKey, 'true');
        this.closePopup();

        Swal.fire({
            title: '¡Listo!',
            text: isSilent ? 'Tus datos fueron enviados. ¡Pronto recibirás novedades!' : 'Te estamos redirigiendo a WhatsApp para completar el envío.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: !isSilent
        }).then(() => {
            if (link) window.open(link, '_blank');
        });
    }
};

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => LeadManager.init());
