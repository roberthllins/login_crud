const mysql = require("mysql2/promise");

{/*Conexão Com o banco de dados */}

const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "banco",
  });


  module.exports = db