const mysql = require("mysql2/promise");
const db = require("../dbProperties");

async function query(sql, params) {
    const connection = await mysql.createConnection(db);
    const [results] = await connection.query(sql, params);
    return results;
}

module.exports = { query };
