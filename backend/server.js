const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const { verifyJWT } = require('./middlewares/verifyJwtMiddleware')
const port = process.env.PORT || 8000

connectDB()

const app = express()

//request undefined middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(cors({
  origin:["http://localhost:3000"],
  method:["GET", "POST"],
  credentials: true,
}))

app.use('/api/fingerspell', require('./routes/api/fingerspellRoutes'))
app.use('/api/spell-hand-sign', require('./routes/api/spellHandSignRoutes'))

app.use('/api/users', require('./routes/api/userRoutes'))

//frontend protected routes
app.use('/verifyJWT', verifyJWT)

app.listen(port, () => console.log(`Server running on PORT ${port}`))