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

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const taskRouter = require('./routes/tasks')
const pointsRouter = require('./routes/points')

app.use('/tasks', taskRouter)
app.use('/points', pointsRouter)

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})