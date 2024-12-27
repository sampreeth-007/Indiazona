const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "xxxxxxxxxxxxx",
    user: "xxxxxxxxxxxxx",
    password: "xxxxxxxxxxxxx",
    database: "xxxxxxxxxxxxx"
});

module.exports = db;