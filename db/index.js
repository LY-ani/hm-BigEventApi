const mysql = require('mysql');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'bigEvent',
});

module.exports = db;
