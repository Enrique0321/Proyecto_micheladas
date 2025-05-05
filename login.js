// Limpiar el sessionStorage cuando se carga la página de login
sessionStorage.removeItem('fromUserButton');

function toggleForms() {
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    
    loginBox.classList.toggle('active');
    registerBox.classList.toggle('active');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loginInput = document.getElementById('loginInput').value;
    const password = document.getElementById('password').value;
    
    // Validar si el input es email o teléfono
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);
    const isPhone = /^[0-9]{10}$/.test(loginInput.replace(/\D/g, ''));
    
    if (!isEmail && !isPhone) {
        alert('Por favor, ingresa un correo electrónico válido o un número de teléfono de 10 dígitos');
        return;
    }
    
    // Aquí puedes agregar la lógica de autenticación
    console.log('Login attempt:', { 
        loginType: isEmail ? 'email' : 'phone',
        loginInput,
        password 
    });
    
    // Por ahora, solo redirigimos al inicio
    window.location.href = 'index.html';
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: password
    };
    
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log('Registro:', formData);
    
    // Por ahora, mostramos mensaje y cambiamos al formulario de login
    alert('¡Registro exitoso! Por favor inicia sesión.');
    toggleForms();
}); 