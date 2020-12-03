let token = null

const blogs = [
  {
    _id: "5a451df7571c224a31b5c8ce",
    author: "Blogger",
    likes: 0,
    title: "Blog",
    url: "abc.com",
    user: {
      _id: "5b6c9d3d64ac6648b0b37bb9",
      username: "tester",
      name: "Test Name"
    }
  },
  {
    _id: "5b734a113a7f2677442a536d",
    author: "Some dude",
    likes: 10,
    title: "Testing",
    url: "123",
    user: {
      _id: "5b6c9d3d64ac6648b0b37bb9",
      username: "tester",
      name: "Test Name"
    }
  },
  {
    _id: "5b7348159143fb139c17d73c",
    author: "qwerty",
    likes: 123,
    title: "abc",
    url: "efg",
    user: {
      _id: "5b6c9d3d64ac6648b0b37bb9",
      username: "tester",
      name: "Test Name"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }