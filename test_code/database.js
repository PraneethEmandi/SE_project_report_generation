import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();
async function getNotes() {
    const [rows] = await pool.query('SELECT * FROM notes');
    return rows;
}
async function getNote(id){
    const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ${id}`);
    return rows;
}   

async function createNode(title){
    const [result]=await pool.query(`INSERT INTO notes (title) VALUES ('${title}')`)
    const id=result.insertId;
    return getNote(id);
}
// const note=await getNote(4);
// console.log(note);
const result=await createNode('new note');
console.log(result);



