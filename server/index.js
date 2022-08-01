const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const playerRoute = require('./routes/players')

const app = express()

app.use(cors())
app.use(express.json())
app.use(playerRoute)



mongoose.connect(process.env.DB_CREDENTIALS)
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log('DB connection err is ', err))


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('server connection successful');
})