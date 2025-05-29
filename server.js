const express = require('express');
const cors = require('cors');
const db = require('./conexion_bd');
const profileRoutes = require('./api/profile');

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

// Conectarse a la base de datos y luego iniciar el servidor
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }

    console.log('Conexión exitosa a MySQL');

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});

// Rutas de la API
app.use('/api', profileRoutes);

// Ruta para registrar usuario
app.post('/register', (req, res) => {
    const { nombre, apellidos, email, telefono, password } = req.body;

    if (!nombre || !apellidos || !email || !telefono || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    db.query(
        'INSERT INTO users (nombre, apellidos, email, telefono, password) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellidos, email, telefono, password],
        (err, result) => {
            if (err) {
                console.error('Error al registrar:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El email o teléfono ya está registrado' });
                }
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito' });
            console.log("usuario registrado con exito")
        }
    );
});

// Ruta para login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const isEmail = email.includes('@');
    const query = isEmail
        ? 'SELECT * FROM users WHERE email = ? AND password = ?'
        : 'SELECT * FROM users WHERE telefono = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
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