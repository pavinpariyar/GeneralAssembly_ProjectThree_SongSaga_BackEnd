import  express  from "express"
import mongoose from "mongoose"
import router from '../../views/router'
import cors from 'cors'
import serverless from "serverless-http"
import dotenv from 'dotenv'
dotenv.config()
import mongoSanitize from 'express-mongo-sanitize'


const app = express()

app.use(express.json())
app.use(cors())
//! Sanitisation
app.use(mongoSanitize())
app.use(router)

async function start() {
  const mongoUrl = process.env.MONGO_DB_URL as string
  await mongoose.connect(mongoUrl)
  
}

start()

export const handler = serverless(app)