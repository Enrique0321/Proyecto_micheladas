// Elementos del DOM
const userBtn = document.querySelector('.user-btn');
const profileModal = document.createElement('div');
profileModal.className = 'profile-modal';
profileModal.style.display = 'none';

// Crear el contenido del modal
profileModal.innerHTML = 
`
    <div class="profile-content">
        <div class="profile-header">
            <h2>Mi Perfil</h2>
            <button class="close-profile">&times;</button>
        </div>
        <div class="profile-body">
            <div class="profile-info">
                <div class="info-group">
                    <label>Nombre:</label>
                    <p id="profile-nombre"></p>
                </div>
                <div class="info-group">
                    <label>Apellidos:</label>
                    <p id="profile-apellidos"></p>
                </div>
                <div class="info-group">
                    <label>Email:</label>
                    <p id="profile-email"></p>
                </div>
                <div class="info-group">
                    <label>Teléfono:</label>
                    <p id="profile-telefono"></p>
                </div>
                <div class="info-group">
                    <label>Fecha de registro:</label>
                    <p id="profile-fecha"></p>
                </div>
            </div>
            <div class="profile-actions">
                <button class="edit-profile-btn">Editar Perfil</button>
                <button class="logout-btn">Cerrar Sesión</button>
            </div>
        </div>
    </div>
`;

// Agregar el modal al body
document.body.appendChild(profileModal);

// Agregar el link al CSS
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'profile.css';
document.head.appendChild(linkElement);

// Funciones
function showProfile() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        alert('Por favor, inicia sesión para ver tu perfil');
        return;
    }

    // Obtener datos del perfil
    fetch(`http://localhost:3001/api/profile/${encodeURIComponent(userEmail)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('profile-nombre').textContent = data.nombre;
            document.getElementById('profile-apellidos').textContent = data.apellidos;
            document.getElementById('profile-email').textContent = data.email;
            document.getElementById('profile-telefono').textContent = data.telefono;
            document.getElementById('profile-fecha').textContent = new Date(data.fecha_registro).toLocaleDateString();
            profileModal.style.display = 'flex';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar el perfil');
        });
}

function closeProfile() {
    profileModal.style.display = 'none';
}

function logout() {
    // Limpiar datos de sesión
    localStorage.removeItem('userEmail');
    // Cerrar el modal
    closeProfile();
    // Redirigir a la página de login
    window.location.href = 'login.html';
}

// Event Listeners
userBtn.addEventListener('click', showProfile);
profileModal.querySelector('.close-profile').addEventListener('click', closeProfile);
profileModal.querySelector('.logout-btn').addEventListener('click', logout);

// Cerrar modal al hacer clic fuera
profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        closeProfile();
    }
}); 