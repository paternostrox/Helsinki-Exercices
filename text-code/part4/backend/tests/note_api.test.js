const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/note")

const api = supertest(app)

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are two notes", async () => {
  const response = await api.get("/api/notes")

  assert.strictEqual(response.body.length, initialNotes.length)
})

test("one of the notes is about HTML", async () => {
  const response = await api.get("/api/notes")

  const contents = response.body.map((e) => e.content)
  assert(contents.includes("HTML is easy"))
})

after(async () => {
  await mongoose.connection.close()
})
