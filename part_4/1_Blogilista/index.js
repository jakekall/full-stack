const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const getToken = require('./middlewares/getToken')

connectToDB = async () => {
  try {
    await mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
    console.log('connected to database', config.mongoUrl)
  } catch (e) {
    console.log(e)
  }
}

connectToDB()

app.use(cors())
app.use(bodyParser.json())
app.use(getToken)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}