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

// Función para manejar el clic en el botón de usuario
function handleUserButtonClick() {
    // Guardar en sessionStorage que venimos del botón de usuario
    sessionStorage.setItem('fromUserButton', 'true');
    // Redirigir a la página de login
    window.location.href = 'login.html';
}

// Agregar el evento al botón de usuario cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const userButton = document.querySelector('.nav-icons a:first-child');
    if (userButton) {
        userButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleUserButtonClick();
        });
    }
    
    // Verificar si estamos en la página de login
    checkLoginPage();
});
