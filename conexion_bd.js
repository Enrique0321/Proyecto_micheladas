const mysql = require('mysql2');

// Configuración de la conexión a MySQL Workbench
const connection = mysql.createConnection({
    host: '127.0.0.1',    // Dirección local de tu computadora
    port: 3306,           // Puerto por defecto de MySQL
    user: 'root',         // Tu usuario de MySQL Workbench
    password: 'admin03',  // Tu contraseña de MySQL Workbench
    database: 'usuarios'  // Nombre de tu base de datos existente
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