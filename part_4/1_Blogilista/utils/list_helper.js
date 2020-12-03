const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  return (
    array.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
  )
}


const favoriteBlog = (array) => {
  if (array.length === 0) {
    return null
  }

  let favoriteBlog = array.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      favorite = blog
    }
    return favorite
  })

  return favoriteBlog = {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs = (array) => {
  if (array.length === 0) {
    return null
  }

  let counts = {}
  let max = 0
  let mostBlogs

  array.forEach(blog => {
    if (counts[blog.author] === undefined) {
      counts[blog.author] = 1
    }
    else {
      counts[blog.author]++
    }
    if (counts[blog.author] > max) {
      max = counts[blog.author]
      mostBlogs = blog.author
    }
  })
  return { author: mostBlogs, blogs: max }
}

const mostLikes = (array) => {
  if (array.length === 0) {
    return null
  }

  let counts = {}
  let max = 0
  let mostLikes

  array.forEach(blog => {
    if (counts[blog.author] == undefined) {
      counts[blog.author] = blog.likes
    }
    else {
      counts[blog.author] += blog.likes
    }
    if (counts[blog.author] > max) {
      max = counts[blog.author]
      mostLikes = blog.author
    }
  })
  return { author: mostLikes, likes: max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}