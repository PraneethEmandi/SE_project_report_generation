import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'peace',
    database: 'notes_app'
}).promise();

const result=await pool.query("SELECT * FROM notes")
console.log(result)
const rows = result[0];
console.log(rows);
// module.exports = pool;


