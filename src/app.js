require('dotenv').config()

const express = require('express')
const logger = require('morgan')

const app = express()
const PORT = process.env.PORT

const mongoose = require('mongoose');
mongoose.connect(process.env.DBADDRESS);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(logger('dev'))

app.use(express.json()) //http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) //http://expressjs.com/en/5x/api.html#express.urlencoded

const taskRouter = require('./routes/tasks')

app.use('/tasks', taskRouter)

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})