require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./database');
const routes = require('./routes')

app.use(express.json());
app.use('/routes',routes)

app.listen(port,(err)=>err?console.error(err):console.log(`Running on port ${port}`))