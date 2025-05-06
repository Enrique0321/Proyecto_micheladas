const express = require('express');
const cors = require('cors');
const db = require('./conexion_bd');

const app = express();
app.use(cors());
app.use(express.json());

// Verificar la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para insertar un usuario
app.post('/register', (req, res) => {
    const { nombre, apellidos, email, telefono, contraseña } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellidos || !email || !telefono || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    db.query(
        'INSERT INTO login (nombre, apellidos, email, telefono, contraseña) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellidos, email, telefono, contraseña],
        (err, result) => {
            if (err) {
                console.error('Error al registrar:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El email o teléfono ya está registrado' });
                }
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        }
    );
});

// Ruta para el login
app.post('/login', (req, res) => {
    const { loginInput, password } = req.body;

    if (!loginInput || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el loginInput es email o teléfono
    const isEmail = loginInput.includes('@');
    const query = isEmail 
        ? 'SELECT * FROM login WHERE email = ? AND contraseña = ?'
        : 'SELECT * FROM login WHERE telefono = ? AND contraseña = ?';

    db.query(query, [loginInput, password], (err, results) => {
        if (err) {
            console.error('Error en login:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            res.json({ message: 'Login exitoso', user: results[0] });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 