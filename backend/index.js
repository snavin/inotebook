const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

//this is an end point as get

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})