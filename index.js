const express = require('express') // importing express
require('dotenv').config()
const app = express() // create an express application
const cors = require('cors') // Used cors package to remove (CORS)Cross-origin resource sharing Error
const port = process.env.PORT || 5000 // define a port
require('./db');
app.use(express.json());
const { notesRouter } = require('./api/v1/index')


app.use(cors()) // Use cors after use of your port (!important)

app.get('/', (req, res) => {
    const fruits = ["apple","banana","grape"]
    const person = [{
        name: "Rajput Usman",
        designation: 'Junior Developer'
    },{
        name: "RajaG",
        designation: 'Senior Developer'
    }]
  res.json(person) // Mostly we will use Objects like person as a responses not strings like "Hello World". As call we use res.json for objects where JSON = Javascript Object Notation
})


app.use('/notes', notesRouter)

app.get('/name', (req, res) => {
  res.send('Rajput Usman')
})
app.get('/aname', (req, res) => {
  res.send('Ibrahim')
})


// other types of call/requests are get,post and put.

app.listen(port, () => { // run the app on the given the port at port const
  console.log(`Example app listening at http://localhost:${port}`)
})