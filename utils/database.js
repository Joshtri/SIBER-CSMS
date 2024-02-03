const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "banbqbykaghzzrsqrdei-mysql.services.clever-cloud.com",
    user: "uhwc7dnlccad96jy",
    password: "uvznVcwfcyZSJ828Fb7t",
    database: "banbqbykaghzzrsqrdei",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mengecek koneksi
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    } else {
        console.log('Database connection established.');
        connection.release(); // Kembalikan koneksi ke pool setelah selesai
    }
});

module.exports = pool.promise();
