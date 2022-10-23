var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    database: "covid19_system",
    port: "3306",
    user: "root",
    password: "123456"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;