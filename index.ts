import  express  from "express"
import mongoose from "mongoose"
import router from './views/router'
import mongoSanitize from 'express-mongo-sanitize'


const app = express()

app.use(express.json())
//! Sanitisation
app.use(mongoSanitize())
app.use(router)

async function start() {
  await mongoose.connect('mongodb://127.0.0.1:27017/songsdb')
  console.log('Connected to the database! 🧬')
  
  app.listen(8000, () => {
  console.log('Express API is running on http://localhost:8000')
  })
}

start()