/**
 * cart.js — Motor de Carrito Global (SB_Cart)
 * Gestiona el carrito de compras en todas las páginas.
 */

const SB_Cart = {
    KEY: 'sb_cart_v1',
    items: [],
    saveCartTimer: null,

    init() {
        const saved = localStorage.getItem(this.KEY);
        this.items = saved ? JSON.parse(saved) : [];
        this.bindEvents();
        this.updateUI();
        // Re-sincronizar después de que ui-sync.js haya terminado
        setTimeout(() => this.updateUI(), 500);
        setTimeout(() => this.updateUI(), 1500);
    },

    persist() { 
        localStorage.setItem(this.KEY, JSON.stringify(this.items));
        this.scheduleSaveToAPI();
    },

    scheduleSaveToAPI() {
        if (this.saveCartTimer) clearTimeout(this.saveCartTimer);
        this.saveCartTimer = setTimeout(() => {
            this.saveCartStateToAPI();
        }, 1500); // 1.5s de gracia para evitar spamear la API
    },

    bindEvents() {
        // Delegación de eventos para botones de "Añadir al carrito"
        document.addEventListener('click', e => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (!btn) return;
            
            const card = btn.closest('.product-card');
            if (!card) return;
            
            this.add({
                name: card.getAttribute('data-name'),
                code: card.getAttribute('data-code'),
                price: parseInt(card.getAttribute('data-price')),
                qty: 1
            });
        });

        // Evento para abrir el carrito
        // Usamos delegación también por si el header se recarga
        document.addEventListener('click', e => {
            if (e.target.closest('#cart-btn')) {
                this.showPreview();
            }
        });

        // Eventos del modal de carrito (botones + - eliminar)
        document.addEventListener('click', e => {
            const btnInc = e.target.closest('.cart-btn-inc');
            if (btnInc) {
                this.changeQty(btnInc.getAttribute('data-code'), 1);
                return;
            }
            const btnDec = e.target.closest('.cart-btn-dec');
            if (btnDec) {
                this.changeQty(btnDec.getAttribute('data-code'), -1);
                return;
            }
            const btnDel = e.target.closest('.cart-btn-del');
            if (btnDel) {
                this.removeItem(btnDel.getAttribute('data-code'));
                return;
            }
        });
    },

    add(product) {
        if (!product.code || isNaN(product.price)) {
            console.warn('[SB_CART] Producto inválido:', product);
            return;
        }

        const existing = this.items.find(i => i.code === product.code);
        if (existing) existing.qty++;
        else this.items.push(product);
        this.persist();
        this.updateUI();
        
        if (window.Swal) {
            Swal.fire({
                toast: true, position: 'top-end', icon: 'success',
                title: `¡Añadido: ${product.name}!`,
                showConfirmButton: false, timer: 2000, timerProgressBar: true
            });
        }
    },

    updateUI() {
        const count = this.items.reduce((a, i) => a + i.qty, 0);
        const btn = document.getElementById('cart-btn');
        const countEl = document.getElementById('cart-count');
        
        if (countEl) countEl.innerText = count;

        document.querySelectorAll('.product-card').forEach(card => {
            const code = card.getAttribute('data-code');
            const inCart = this.items.some(i => i.code === code);
            card.classList.toggle('product-in-cart', inCart);
            const b = card.querySelector('.add-to-cart-btn');
            if (b) {
                b.innerText = inCart ? 'En Carrito' : 'Comprar';
            }
        });

        if (btn) {
            btn.classList.remove('hidden');
            btn.classList.add('flex');
        }
    },

    renderCartHtml() {
        let html = `<div class="text-left text-sm max-h-[40vh] overflow-y-auto px-2"><table class="w-full"><thead class="border-b border-gray-100 italic text-brandText/60 text-[10px] uppercase"><tr><th class="py-2 text-left">Producto</th><th class="py-2 text-center">Cant.</th><th class="py-2 text-right">Subtotal</th></tr></thead><tbody class="divide-y divide-gray-50 uppercase text-[11px] font-bold">`;
        let total = 0;
        this.items.forEach(item => {
            const sub = item.price * item.qty;
            total += sub;
            html += `<tr>
                <td class="py-3">${item.name} <br><span class="text-[9px] text-gray-400">CÓD. ${item.code}</span></td>
                <td class="py-3">
                    <div class="flex items-center justify-center gap-2">
                        <button class="cart-btn-dec w-5 h-5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary transition-colors flex items-center justify-center" data-code="${item.code}">-</button>
                        <span class="w-4 text-center">${item.qty}</span>
                        <button class="cart-btn-inc w-5 h-5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary transition-colors flex items-center justify-center" data-code="${item.code}">+</button>
                    </div>
                </td>
                <td class="py-3 text-right whitespace-nowrap">
                    $ ${sub.toLocaleString('es-AR')}
                    <button class="cart-btn-del text-red-400 hover:text-red-600 ml-1 transition-colors" data-code="${item.code}" title="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </td>
            </tr>`;
        });
        
        if (this.items.length === 0) {
            html = `<div class="py-10 text-center text-brandSubtext italic uppercase tracking-widest text-xs">El carrito está vacío</div>`;
        } else {
            html += `</tbody></table></div><div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center px-2"><span class="font-black text-brandText uppercase tracking-widest">Total:</span><span class="text-xl font-black text-primary">$ ${total.toLocaleString('es-AR')}</span></div>`;
        }
        return html;
    },

    showPreview() {
        if (!window.Swal) return;

        Swal.fire({
            title: 'Tu Pedido', 
            html: this.renderCartHtml(),
            showCloseButton: true,
            showCancelButton: this.items.length > 0,
            showDenyButton: this.items.length > 0,
            confirmButtonText: this.items.length > 0 ? 'Enviar por WhatsApp' : 'Ir a la Tienda',
            denyButtonText: 'Agregar Producto',
            cancelButtonText: 'Vaciar Carrito',
            confirmButtonColor: '#25D366',
            denyButtonColor: '#BE185D',
            cancelButtonColor: '#ff4b2b',
            reverseButtons: true,
            background: '#fff', color: '#064e3b', width: '95%',
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-full px-6 py-3 font-bold text-sm m-1',
                denyButton: 'rounded-full px-6 py-3 font-bold text-sm m-1',
                cancelButton: 'rounded-full px-6 py-3 font-bold text-sm m-1'
            }
        }).then(r => {
            // Guardar analíticas del carrito al cerrar el popup (sin bloquear navegación)
            this.saveCartStateToAPI();

            if (r.isConfirmed && this.items.length > 0) {
                this.sendWhatsApp();
            } else if (r.isDenied || (r.isConfirmed && this.items.length === 0)) {
                // Ir a la zona de ventas (Joyas)
                if (window.location.pathname.includes('joyas')) {
                    const productosSeccion = document.getElementById('productos');
                    if (productosSeccion) {
                        productosSeccion.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    const configScript = document.querySelector('script[src*="js/config.js"]');
                    const isSubdir = configScript && configScript.getAttribute('src').startsWith('../');
                    window.location.href = (isSubdir ? '../' : '') + 'joyas/index.html#productos';
                }
            }
            if (r.dismiss === Swal.DismissReason.cancel) this.clear();
        });
    },

    updatePreview() {
        if (window.Swal && Swal.isVisible()) {
            Swal.update({
                html: this.renderCartHtml(),
                showCancelButton: this.items.length > 0,
                showDenyButton: this.items.length > 0,
                confirmButtonText: this.items.length > 0 ? 'Enviar por WhatsApp' : 'Ir a la Tienda'
            });
        }
    },

    sendWhatsApp() {
        let msg = `Hola Mercedes! Quisiera realizar el siguiente pedido por la web:\n\n`;
        let total = 0;
        this.items.forEach(i => {
            const sub = i.price * i.qty;
            total += sub;
            msg += `- *${i.qty}x* ${i.name} (Cód: ${i.code}) — $${sub.toLocaleString('es-AR')}\n`;
        });
        msg += `\nTOTAL: $${total.toLocaleString('es-AR')}\n\n¿Me podés confirmar disponibilidad? ¡Gracias!`;
        window.open(`https://wa.me/5492233453279?text=${encodeURIComponent(msg)}`, '_blank');
    },

    changeQty(code, delta) {
        const item = this.items.find(i => i.code === code);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.items = this.items.filter(i => i.code !== code);
            }
            this.persist();
            this.updateUI();
            this.updatePreview();
        }
    },

    removeItem(code) {
        this.items = this.items.filter(i => i.code !== code);
        this.persist();
        this.updateUI();
        this.updatePreview();
    },

    clear() {
        this.items = [];
        this.persist();
        this.updateUI();
        if (window.Swal) Swal.fire('¡Carrito Vacío!', '', 'info');
    },

    saveCartStateToAPI() {
        let total = 0;
        this.items.forEach(i => total += i.price * i.qty);

        // Usamos una URL absoluta opcionalmente si es localhost, sino asume que la API de Vercel existe
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:3000/api/save-cart' // Por si usan vercel dev
            : '/api/save-cart';

        try {
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                keepalive: true, // Vital para que no se cancele al hacer window.location.href
                body: JSON.stringify({
                    items: this.items,
                    total: total,
                    origin: window.location.href
                })
            }).catch(e => console.log('[CART_API] Modo offline o API local no disponible.'));
        } catch (e) {
            console.error('[CART_API] Error enviando analytics del carrito:', e);
        }
    }
};

// Inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SB_Cart.init());
} else {
    SB_Cart.init();
}
