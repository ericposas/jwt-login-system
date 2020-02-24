import path from 'path'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import router from './router'

dotenv.config()
// console.log(process.env.MONGO_USER, process.env.MONGO_PASSWORD)
const server = express()

mongoose.connection.on('connected', () => console.log('mongo db connected!'))
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.DATABASE}?authSource=admin`, {
  useNewUrlParser: true, useUnifiedTopology: true
})

server.use('/', express.static(path.join(__dirname, '../public')))
server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(router)

server.listen(3000, () => console.log('server is up'))
