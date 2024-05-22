const mongoose = require('mongoose')

if(process.argv.length < 2) {
  console.log('Minimum argument quota not met. Maybe you are missing a password?')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pedropaternostro:${password}@cluster0.osbexjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
