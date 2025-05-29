const express = require('express');
const router = express.Router();
const connection = require('../conexion_bd');

// Obtener perfil del usuario
router.get('/profile/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const query = 'SELECT nombre, apellidos, email, telefono, fecha_registro FROM users WHERE email = ?';
        
        connection.query(query, [email], (error, results) => {
            if (error) {
                console.error('Error al obtener el perfil:', error);
                return res.status(500).json({ error: 'Error al obtener el perfil' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            
            res.json(results[0]);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Actualizar perfil del usuario
router.put('/profile/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { nombre, apellidos, telefono } = req.body;
        
        const query = 'UPDATE users SET nombre = ?, apellidos = ?, telefono = ? WHERE email = ?';
        
        connection.query(query, [nombre, apellidos, telefono, email], (error, results) => {
            if (error) {
                console.error('Error al actualizar el perfil:', error);
                return res.status(500).json({ error: 'Error al actualizar el perfil' });
            }
            
            res.json({ message: 'Perfil actualizado exitosamente' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router; 