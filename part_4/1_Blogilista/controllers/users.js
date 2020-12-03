const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, url: 1, author: 1, likes: 1 })

    response.json(users.map(User.format))
    
  } catch (e) {
    console.log(e)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'user already exists' })
    }
    if (body.password.length < 4) {
      return response.status(400).json({ error: 'password needs to be atleast 3 characters long' })
    }

    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      password,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult
    })

    await user.save()

    response.status(201).json(User.format(user))

  } catch (e) {
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter