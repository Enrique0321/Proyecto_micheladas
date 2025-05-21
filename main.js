// Selecciona el icono del menú 
let menu = document.querySelector(".menu-icon");
// Selecciona la barra de navegación
let navbar = document.querySelector(".navbar");

// Evento de clic en el icono del menú
menu.onclick = () => {
  // Alterna la clase "move" en el icono del menú para animar la apertura/cierre
  menu.classList.toggle("move");
  // Alterna la clase "open-menu" en la barra de navegación para mostrarla/ocultarla
  navbar.classList.toggle("open-menu");
};

// Cierra el menú cuando el usuario hace scroll en la página
window.onscroll = () => {
  // Remueve la clase "move" del icono del menú para devolverlo a su estado original
  menu.classList.remove("move");
  // Remueve la clase "open-menu" de la barra de navegación para cerrarla
  navbar.classList.remove("open-menu");
};

// Configuración de ScrollReveal para animaciones de desplazamiento
const animate = ScrollReveal({
  origin: "top", // La animación comienza desde la parte superior
  distance: "60px", // Define la distancia de desplazamiento de la animación
  duration: "2500", // Duración de la animación en milisegundos (2.5s)
  delay: "400", // Retraso antes de que inicie la animación en milisegundos (0.4s)
});

// Aplica la animación a diferentes elementos de la página

// Anima el texto principal en la sección "home", apareciendo desde la izquierda
animate.reveal(".home-text", { origin: "left" });

// Anima la imagen principal en la sección "home", apareciendo desde abajo
animate.reveal(".home-img", { origin: "bottom" });

// Anima los títulos principales y la sección del boletín, apareciendo desde arriba
animate.reveal(".heading,.newsletter h2", { origin: "top" });

// Aplica animaciones a múltiples elementos con un pequeño intervalo entre ellos
animate.reveal(
  "header,.feature-box,.feature-menu-box,.item-box,.m-item-box,.t-box,.newsletter",
  {
    interval: 100, // Agrega un intervalo de 100ms entre cada animación de los elementos seleccionados
  }
);

// Función para verificar si el usuario está en la página de login
function checkLoginPage() {
    // Si estamos en la página de login y no venimos del botón de usuario, redirigir al inicio
    if (window.location.pathname.includes('login.html') && !sessionStorage.getItem('fromUserButton')) {
        window.location.href = 'index.html';
    }
}

// Función para manejar el clic en el botón de iniciar sesión
function handleLoginButtonClick() {
    window.location.href = 'login.html';
}

// Agregar los eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento al botón de iniciar sesión
    const loginButton = document.querySelector('.login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleLoginButtonClick();
        });
    }
    
    // Verificar si estamos en la página de login
    checkLoginPage();

    // Agregar comportamiento suave de desplazamiento para el botón "Ordenar ahora"
    const orderNowBtn = document.querySelector('.btn');
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const menuSection = document.querySelector('#menu-container');
            if (menuSection) {
                menuSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Funcionalidad del Carrito
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartBtn = document.getElementById('cart-btn');
        this.cartModal = document.getElementById('cart-modal');
        this.closeCart = document.getElementById('close-cart');
        this.cartItems = document.getElementById('cart-items');
        this.cartCount = document.getElementById('cart-count');
        this.cartTotal = document.getElementById('cart-total');
        this.checkoutBtn = document.getElementById('checkout-btn');
        
        this.init();
    }

    init() {
        // Event Listeners
        this.cartBtn.addEventListener('click', () => this.toggleCart());
        this.closeCart.addEventListener('click', () => this.toggleCart());
        this.checkoutBtn.addEventListener('click', () => this.checkout());

        // Agregar event listeners a los botones de "Agregar al carrito"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => this.addToCart(e));
        });

        // Actualizar el carrito al cargar la página
        this.updateCart();
    }

    toggleCart() {
        this.cartModal.classList.toggle('active');
    }

    addToCart(e) {
        const button = e.target;
        const item = {
            id: Date.now(), // ID único para cada item
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };

        // Verificar si el item ya existe en el carrito
        const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push(item);
        }

        this.updateCart();
        this.showNotification('Producto agregado al carrito');
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.updateCart();
    }

    updateQuantity(id, change) {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(id);
            } else {
                this.updateCart();
            }
        }
    }

    updateCart() {
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // Actualizar contador
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        this.cartCount.textContent = totalItems;

        // Actualizar lista de items
        this.cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="cart.removeFromCart(${item.id})">×</button>
            </div>
        `).join('');

        // Actualizar total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.textContent = total.toFixed(2);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Aquí puedes implementar la lógica de checkout
        alert('¡Gracias por tu compra!');
        this.cart = [];
        this.updateCart();
        this.toggleCart();
    }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});
