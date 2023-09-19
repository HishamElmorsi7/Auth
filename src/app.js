require('dotenv').config();

const mongoose = require('mongoose')
const express = require('express');
const app = express();


port = process.env.PORT || 3000

const databaseUrl = process.env.DB_CONNECTION_STRING



mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(()=>{
    console.log('connected to DB')
  })

  .catch((err) => {
    console.log('DB connection error:', err)
  })


  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

