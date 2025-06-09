// Array de productos de ejemplo
const products = [
    { id: 1, name: 'Guantes de gimnasio', price: 50000, image: 'images/guantes.jpg', category: 'accesorios' },
    { id: 2, name: 'Proteína Whey', price: 150000, image: 'images/proteina.jpg', category: 'suplementos' },
    { id: 3, name: 'Bicicleta estática', price: 1200000, image: 'images/bicicleta.jpg', category: 'equipos' },
    { id: 4, name: 'Bandas elásticas', price: 30000, image: 'images/bandas.jpg', category: 'accesorios' }
];

const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');

function renderProducts(filterCategory = 'all', searchQuery = '') {
    productList.innerHTML = '';

    const filteredProducts = products.filter(product => {
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toLocaleString()}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
        `;
        productList.appendChild(productCard);
    });

    // Listeners para botones agregar
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} agregado al carrito.`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Event listeners filtros
categoryFilter.addEventListener('change', () => {
    renderProducts(categoryFilter.value, searchInput.value);
});

searchInput.addEventListener('input', () => {
    renderProducts(categoryFilter.value, searchInput.value);
});

// Init
renderProducts();
updateCartCount();
