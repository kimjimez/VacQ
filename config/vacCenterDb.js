const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123$56",
  database: "vacCenter",
  port: 3306,
});

module.exports = connection;   