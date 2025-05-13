const mysql = require('mysql2');

// Crear la conexión
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin03',
    database: 'usuarios'
});

// Probar la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar con MySQL Workbench:', err);
        console.error('Detalles del error:', {
            code: err.code,
            errno: err.errno,
            sqlState: err.sqlState,
            sqlMessage: err.sqlMessage
        });
        return;
    }
    console.log('Conexión exitosa a MySQL Workbench');
    console.log('Configuración de conexión:', {
        host: connection.config.host,
        port: connection.config.port,
        user: connection.config.user,
        database: connection.config.database
    });
});

// Manejar errores de conexión
connection.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconectando a la base de datos...');
        connection.connect();
    } else {
        throw err;
    }
});

module.exports = connection; 