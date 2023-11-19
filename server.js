const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('connected to mongoDB')
})

.catch((error) => {
    console.log(`An error has happened: ${error}`)
})

const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})
db.once('open', () => {
    console.log('connected to the database')
})

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3000, () => {console.log("Server started")})
