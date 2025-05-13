// Limpiar el sessionStorage cuando se carga la página de login
sessionStorage.removeItem('fromUserButton');

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.querySelector('.register-box');
    const registerLink = document.querySelector('.register-link a');
    const loginLink = document.querySelector('.login-link a');

    // Función para mostrar el formulario de registro
    function showRegisterForm() {
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    }

    // Función para mostrar el formulario de login
    function showLoginForm() {
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    }

    // Event listeners para los enlaces
    registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        showRegisterForm();
    });

    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        showLoginForm();
    });

    // Manejo del formulario de login
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login exitoso');
                window.location.href = '/index.html'; // Redirigir al dashboard
            } else {
                alert(data.message || 'Error en el login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar iniciar sesión');
        }
    });

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        // Validaciones
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (!terms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellidos,
                    email,
                    telefono,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso');
                showLoginForm(); // Mostrar el formulario de login después del registro
            } else {
                alert(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar registrar');
        }
    });
});