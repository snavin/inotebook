const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

//this is an end point as get
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Middleware
app.use(express.json());

//Available Routes - end points
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})