const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

    response.json(blogs)

  } catch (e) {
    console.log(e)
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'information missing' })
    }

    if (body.likes === undefined) {
      body.likes = 0
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const blogToReturn = await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

    response.status(201).json(blogToReturn)

  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      response.status(401).json({ error: e.message })
    } else {
      console.log(e)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const body = request.body

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog === null) {
      return response.status(400).send({ error: 'malformatted id' })
    }

    const id = blog.user.toString()

    if (decodedToken.id !== id) {
      return response.status(401).json({ error: 'authorization failed' })
    }

    await blog.remove()
    const user = await User.findById(id)
    const blogs = user.blogs.filter(b => b.id !== blog.id)
    user.blogs = blogs
    await user.save()

    response.status(204).end()

  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      response.status(401).json({ error: e.message })
    } else {
      console.log(e)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = {
      likes: request.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)

  } catch (e) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter