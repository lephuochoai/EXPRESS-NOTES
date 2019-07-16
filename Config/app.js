const express = require('express');
require('dotenv').config();

global.Env = process.env;
const cors = require('cors')

const app = express();
app.use(cors());

const http = require('http').Server(app);

app.use(express.json());

http.listen(Env.PORT, () => {
    console.log(`Server run at port: ${Env.PORT}`);
});


module.exports = app;
