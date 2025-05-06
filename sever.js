// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para insertar un usuario
app.post('/register', (req, res) => {
  const { nombre, apeliidos, email, telefono, contraseña } = req.body;

  db.query(
    'INSERT INTO users (nombre, apeliidos, email, telefono, contraseña) VALUES (?, ?, ?, ?, ?)',
    [nombre, apeliidos, email, telefono, contraseña],
    (err, result) => {
      if (err) return res.status(500).send('Error al registrar');
      res.send('Usuario registrado con éxito');
    }
  );
});

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
