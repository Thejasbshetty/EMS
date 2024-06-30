const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
require("./db/connection");
const port = 8080;
const router = require('./Routes/router');
const dept_router = require('./Routes/dept_router');


// app.get('/', (req, res) => {
//     res.send('Server Started!');
// });

//middleware
app.use(express.json());
app.use(cors());
app.use(router);
app.use(dept_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});