// products.js - Mostrar productos destacados

document.addEventListener('DOMContentLoaded', function() {
    // Tus productos destacados
    const products = [
        { 
            id: 1, 
            name: 'Guantes de gimnasio', 
            price: 50000, 
            image: 'images/guantes.jpg', 
            category: 'accesorios',
            description: 'Guantes profesionales para entrenamiento con agarre antideslizante'
        },
        { 
            id: 2, 
            name: 'Proteína Whey', 
            price: 150000, 
            image: 'images/proteina.jpg', 
            category: 'suplementos',
            description: 'Proteína de suero de leche para recuperación muscular'
        },
        { 
            id: 3, 
            name: 'Bicicleta estática', 
            price: 1200000, 
            image: 'images/bicicleta.jpg', 
            category: 'equipos',
            description: 'Bicicleta estática profesional con monitor de rendimiento'
        },
        { 
            id: 4, 
            name: 'Bandas elásticas', 
            price: 30000, 
            image: 'images/bandas.jpg', 
            category: 'accesorios',
            description: 'Set de bandas de resistencia para entrenamiento funcional'
        }
    ];

    // Elemento contenedor de productos
    const productList = document.getElementById('product-list');
    
    // Función para formatear precios en pesos colombianos
    function formatPrice(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(price);
    }

    // Función para renderizar productos
    function renderProducts(productsToRender) {
        // Limpiar contenedor primero
        productList.innerHTML = '';
        
        // Verificar si hay productos
        if (productsToRender.length === 0) {
            productList.innerHTML = '<p class="no-products">No hay productos destacados disponibles</p>';
            return;
        }
        
        // Crear HTML para cada producto
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <span class="category-badge">${product.category}</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                
                </div>
            `;
            productList.appendChild(productCard);
        });

        // Añadir event listeners a los botones
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Función para añadir al carrito
    function addToCart(event) {
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Obtener carrito actual de localStorage o crear uno nuevo
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Verificar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            // Guardar en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Actualizar contador del carrito
            updateCartCount();
            
            // Feedback visual
            event.currentTarget.innerHTML = '<i class="fas fa-check"></i> Añadido';
            event.currentTarget.style.backgroundColor = '#4CAF50';
            event.currentTarget.disabled = true;
            
            setTimeout(() => {
                event.currentTarget.innerHTML = '<i class="fas fa-cart-plus"></i> Añadir';
                event.currentTarget.style.backgroundColor = '';
                event.currentTarget.disabled = false;
            }, 1500);
        }
    }

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    }

    // Inicializar
    renderProducts(products); // Mostramos todos tus productos como destacados
    updateCartCount();
});