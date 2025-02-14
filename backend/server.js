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
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

app.get('/', async (req, res) => {
  res.send('This is the body page')
})

app.listen(PORT, async () => {
  console.log(`\n🔻 Server running on http://localhost:${PORT}`)
})
