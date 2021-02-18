const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true },(err)=>{
  err?console.log(err):console.log('Database running')
})