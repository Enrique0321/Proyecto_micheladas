// Limpiar el sessionStorage cuando se carga la página de login
sessionStorage.removeItem('fromUserButton');

// Función para alternar entre los formularios de login y registro
function toggleForms() {
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    loginBox.classList.toggle('hidden');
    registerBox.classList.toggle('hidden');
}

// Manejar el envío del formulario de registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar que las contraseñas coincidan
    if (contraseña !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                apellidos,
                email,
                telefono,
                contraseña
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
            toggleForms(); // Cambiar al formulario de login
        } else {
            alert(data.error || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
});

// Manejar el envío del formulario de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginInput = document.getElementById('loginInput').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loginInput,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login exitoso');
            // Aquí puedes redirigir al usuario a la página principal
            window.location.href = 'index.html';
        } else {
            alert(data.error || 'Error en el login');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}); 