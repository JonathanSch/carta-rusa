const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./database');
const routes = require('./routes')

app.use(express.json());
app.use('/routes',routes)

app.get('/', (req,res)=>{
    res.send({message:'All great'}).status(200);
})

app.listen(port,(err)=>err?console.error(err):console.log(`Running on port ${port}`))