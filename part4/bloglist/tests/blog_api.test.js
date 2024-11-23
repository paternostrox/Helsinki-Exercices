const { test, after, describe, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promises = blogObjects.map((blog) => blog.save())
  await Promise.all(promises)
})

describe("api", () => {
  test("returns right amount of blogs in JSON", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    assert(blogs.body.length, helper.initialBlogs.length)
  })

  test("blogs ids are actually named id", async () => {
    const blogs = await helper.getDbBlogs()

    const allBlogsHaveId = blogs.reduce(
      (acc, blog) => acc && Object.hasOwn(blog, "id"),
      true
    )

    assert(allBlogsHaveId)
  })

  test("a valid blog can safely be added", async () => {
    await api
      .post("/api/blogs")
      .send(helper.blogNotInDb)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogs = await helper.getDbBlogs()

    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)

    const titles = blogs.map((blog) => blog.title)
    assert(titles.includes("The Art of Rump"))
  })

  test("likes get defaulted to zero if missing", async () => {
    await api
      .post("/api/blogs")
      .send(helper.blogNotInDbWithNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogs = await helper.getDbBlogs()

    const newBlog = blogs.find((blog) => blog.title === "The Art of Rump")
    assert.strictEqual(newBlog.likes, 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})
