/**
 * cart.js — Motor de Carrito Global (SB_Cart)
 * Gestiona el carrito de compras en todas las páginas.
 */

const SB_Cart = {
    KEY: 'sb_cart_v1',
    items: [],

    init() {
        const saved = localStorage.getItem(this.KEY);
        this.items = saved ? JSON.parse(saved) : [];
        this.bindEvents();
        this.updateUI();
    },

    persist() { localStorage.setItem(this.KEY, JSON.stringify(this.items)); },

    bindEvents() {
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const card = e.target.closest('.product-card');
                if (!card) return;
                this.add({
                    name: card.dataset.name,
                    code: card.dataset.code,
                    price: parseInt(card.dataset.price),
                    qty: 1
                });
            });
        });
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showPreview());
        }
    },

    add(product) {
        const existing = this.items.find(i => i.code === product.code);
        if (existing) existing.qty++;
        else this.items.push(product);
        this.persist();
        this.updateUI();
        
        // SweetAlert2 check
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
            const inCart = this.items.some(i => i.code === card.dataset.code);
            card.classList.toggle('product-in-cart', inCart);
            const b = card.querySelector('.add-to-cart-btn');
            if (b) b.innerText = inCart ? 'En Carrito' : 'Comprar';
        });

        if (btn) {
            btn.classList.remove('hidden');
            btn.classList.add('flex');
        }
    },

    showPreview() {
        if (!window.Swal) return;

        let html = `<div class="text-left text-sm max-h-[40vh] overflow-y-auto px-2"><table class="w-full"><thead class="border-b border-gray-100 italic text-brandText/60 text-[10px] uppercase"><tr><th class="py-2 text-left">Producto</th><th class="py-2 text-center">Cant.</th><th class="py-2 text-right">Subtotal</th></tr></thead><tbody class="divide-y divide-gray-50 uppercase text-[11px] font-bold">`;
        let total = 0;
        this.items.forEach(item => {
            const sub = item.price * item.qty;
            total += sub;
            html += `<tr><td class="py-3">${item.name} <br><span class="text-[9px] text-gray-400">CÓD. ${item.code}</span></td><td class="py-3 text-center">${item.qty}</td><td class="py-3 text-right">$ ${sub.toLocaleString('es-AR')}</td></tr>`;
        });
        
        if (this.items.length === 0) {
            html = `<div class="py-10 text-center text-brandSubtext italic uppercase tracking-widest text-xs">El carrito está vacío</div>`;
        } else {
            html += `</tbody></table></div><div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center px-2"><span class="font-black text-brandText uppercase tracking-widest">Total:</span><span class="text-xl font-black text-primary">$ ${total.toLocaleString('es-AR')}</span></div>`;
        }

        Swal.fire({
            title: 'Tu Pedido', html,
            showCancelButton: this.items.length > 0,
            confirmButtonText: this.items.length > 0 ? 'Enviar por WhatsApp' : 'Volver',
            cancelButtonText: 'Vaciar Carrito',
            confirmButtonColor: '#25D366',
            cancelButtonColor: '#ff4b2b',
            reverseButtons: true,
            background: '#fff', color: '#064e3b', width: '95%',
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-full px-8 py-3 font-bold',
                cancelButton: 'rounded-full px-8 py-3 font-bold'
            }
        }).then(r => {
            if (r.isConfirmed && this.items.length > 0) this.sendWhatsApp();
            if (r.dismiss === Swal.DismissReason.cancel) this.clear();
        });
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

    clear() {
        this.items = [];
        this.persist();
        this.updateUI();
        if (window.Swal) Swal.fire('¡Carrito Vacío!', '', 'info');
    }
};

// Inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SB_Cart.init());
} else {
    SB_Cart.init();
}
