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
            <button class="edit-profile-btn">Editar Perfil</button>
        </div>
    </div>
`;

// Agregar el modal al body
document.body.appendChild(profileModal);

// Estilos del modal
const styles = `
    .profile-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .profile-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
    }

    .profile-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .close-profile {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }

    .profile-info {
        margin-bottom: 20px;
    }

    .info-group {
        margin-bottom: 15px;
    }

    .info-group label {
        font-weight: bold;
        margin-right: 10px;
    }

    .edit-profile-btn {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .edit-profile-btn:hover {
        background-color: #45a049;
    }
`;

// Agregar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

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

// Event Listeners
userBtn.addEventListener('click', showProfile);
profileModal.querySelector('.close-profile').addEventListener('click', closeProfile);

// Cerrar modal al hacer clic fuera
profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        closeProfile();
    }
}); 