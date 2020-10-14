const mysql = require("mysql2/promise");
let connection;
module.exports = {
  async initDB() {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "web07",
    });
  },
  getDB() {
    return connection;
  },
};
