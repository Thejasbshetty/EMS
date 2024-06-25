const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
require("./db/connection");
const port = 8080;


// app.get('/', (req, res) => {
//     res.send('Server Started!');
// });

//middleware
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});