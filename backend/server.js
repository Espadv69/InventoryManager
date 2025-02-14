const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

mongoose
  .connect('http://127.0.0.1:27017/products')
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))
