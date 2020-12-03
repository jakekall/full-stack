const Blog = require('../models/blog')

const intialBlogs = [
  {
    title: 'Testi Blogi',
    author: 'Tessi Testaaja',
    url: 'testiurl.com',
    likes: 2
  },
  {
    title: 'Otsikko',
    author: 'Kirjoittaja',
    url: 'Osoite',
    likes: 0
  },
  {
    title: 'Penan blogi',
    author: 'Pena',
    url: 'penanblogi.fi',
    likes: 1000
  }
]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  intialBlogs, format, blogsInDB
}