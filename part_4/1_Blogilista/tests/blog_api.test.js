const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { intialBlogs, blogsInDB, format } = require('./test_helper')

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = intialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

describe('GET tests', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('amount of blogs is correct', async () => {
    const blogsInDatabase = await blogsInDB()

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogsInDatabase.length)
  })
})

describe('POST tests', () => {

  let token

  beforeAll(async () => {
    await User.remove({})

    await api
      .post('/api/users')
      .send({
        name: 'name',
        username: 'username',
        password: 'password'
      })

    const response = await api
      .post('/api/login')
      .send({
        username: 'username',
        password: 'password'
      })

    token = response.body.token
  })

  test('a valid blog is added', async () => {
    const newBlog = {
      title: 'abc',
      author: 'def',
      url: 'ghi',
      likes: 10
    }

    const blogsBefore = await blogsInDB()

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDB()

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual(newBlog)
  })

  test('when likes is undefined it\'s set to one', async () => {
    const newBlog = {
      title: 'o',
      author: 'oo',
      url: 'ooo'
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAfter = await blogsInDB()
    const blog = blogsAfter.filter(r => r.title === 'o')

    expect(blog[0].likes).toBe(0)
  })

  test('POST with missing info fails with correct status code and error', async () => {
    const newBlog = {
      title: 'aaaaa'
    }

    const blogsBefore = await blogsInDB()

    const response = await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    expect(response.body.error).toBe('information missing')

    const blogsAfter = await blogsInDB()

    expect(blogsBefore.length).toBe(blogsAfter.length)
    expect(blogsAfter).not.toContainEqual(newBlog)
  })
})

describe('DELETE tests', () => {
  let blog

  beforeEach(async () => {
    blog = new Blog({
      title: 'Blog for deletion',
      author: 'Void',
      url: 'Nothingness',
      likes: 15
    })
    await blog.save()
  })

  test('DELETE works with correct status code', async () => {
    const blogsBefore = await blogsInDB()

    await api
      .delete(`/api/blogs/${blog._id}`)
      .expect(204)

    const blogsAfter = await blogsInDB()

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    expect(blogsAfter).not.toContainEqual(blog)
  })

  test('DELETE with wrong id fails with correct status code and error', async () => {
    const blogsBefore = await blogsInDB()

    const response = await api
      .delete('/api/blogs/1234')
      .expect(400)

    expect(response.body.error).toBe('malformatted id')

    const blogsAfter = await blogsInDB()
    blog = format(blog)

    expect(blogsAfter.length).toBe(blogsBefore.length)
    expect(blogsAfter).toContainEqual(blog)
  })
})

describe('PUT tests', () => {
  let blog

  beforeEach(async () => {
    blog = new Blog({
      title: 'Blog for updating',
      author: 'A',
      url: 'B',
      likes: 99
    })
    await blog.save()
  })

  test('PUT with valid id works', async () => {
    const originalLikes = blog.likes
    blog.likes++

    await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)

    const updatedBlog = await Blog.findById(blog.id)
    expect(updatedBlog.likes).toBe(originalLikes + 1)
  })

  test('PUT with invalid id fails correctly', async () => {
    const originalLikes = blog.likes
    blog.likes++

    const response = await api
      .put(`/api/blogs/12345`)
      .send(blog)
      .expect(400)

    expect(response.body.error).toBe('malformatted id')

    const updatedBlog = await Blog.findById(blog.id)
    expect(updatedBlog.likes).toBe(originalLikes)
  })
})

describe('User creation tests', () => {

  beforeEach(async () => {
    await User.remove({})
  })

  test('No dublicate user created', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'testname',
        username: 'testusername',
        password: 'testpassword'
      })
      .expect(201)

    const response = await api
      .post('/api/users')
      .send({
        name: 'testname',
        username: 'testusername',
        password: 'testpassword'
      })
      .expect(400)

    expect(response.body.error).toBe('user already exists')

    const users = await User.find({})
    expect(users.length).toBe(1)
  })

  test('User not created when password is invalid', async () => {
    const response = await api
      .post('/api/users')
      .send({
        name: 'testname',
        username: 'testusername',
        password: 'a'
      })
      .expect(400)

    expect(response.body.error).toBe('password needs to be atleast 3 characters long')

    const users = await User.find({})
    expect(users.length).toBe(0)
  })
})

afterAll(() => {
  server.close()
})