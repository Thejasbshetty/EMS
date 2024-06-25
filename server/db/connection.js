const mysql = require("mysql2");

require('dotenv').config();

const connection = mysql.createConnection({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(err) {
        console.log("Error connecting to database", err);
    } else {
        console.log("Connected to database");
    }
});

module.exports = connection;