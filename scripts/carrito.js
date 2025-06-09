const cartItemsContainer = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const envioEl = document.getElementById('envio');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        checkoutBtn.disabled = true;
        updateSummary(0);
        updateCartCount();
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>Precio: $${item.price.toLocaleString()}</p>
                <p>Cantidad: ${item.quantity}</p>
                <button class="remove-btn" data-id="${item.id}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Listeners para eliminar
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateSummary(subtotal);
    checkoutBtn.disabled = false;
    updateCartCount();
}

function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateSummary(subtotal) {
    const envio = subtotal > 0 ? 10000 : 0; // Ejemplo: envío fijo de $10.000
    const total = subtotal + envio;

    subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    envioEl.textContent = `$${envio.toLocaleString()}`;
    totalEl.textContent = `$${total.toLocaleString()}`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Init
renderCart();
