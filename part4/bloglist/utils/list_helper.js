const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, item) => (acc += item.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let favorite = blogs[0]
  blogs.map((item) => {
    if (item.likes >= favorite.likes) favorite = item
  })
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorMap = new Map()

  blogs.map((item) => {
    const author = authorMap.get(item.author)
    if (author) {
      author.blogs++
    } else {
      authorMap.set(item.author, {
        author: item.author,
        blogs: 1,
      })
    }
  })

  const authors = Array.from(authorMap.values())
  let authorWithMostBlogs = authors[0]

  authors.map((a) => {
    if (a.blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = a
    }
  })
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorMap = new Map()

  blogs.map((item) => {
    const author = authorMap.get(item.author)
    if (author) {
      author.likes += item.likes
    } else {
      authorMap.set(item.author, {
        author: item.author,
        likes: item.likes,
      })
    }
  })

  const authors = Array.from(authorMap.values())
  let authorWithMostLikes = authors[0]

  authors.map((a) => {
    if (a.likes > authorWithMostLikes.likes) {
      authorWithMostLikes = a
    }
  })
  return authorWithMostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
