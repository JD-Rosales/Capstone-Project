const path = require('path')
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

//general user routes
app.use('/api/generalUser', require('./routes/api/generalUserRoutes'))

//teacher routes
app.use('/api/teacher', require('./routes/api/teacherRoutes'))
//student routes
app.use('/api/student', require('./routes/api/studentRoutes'))

//frontend protected routes
app.use('/verifyJWT', verifyJWT)

//Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))

app.listen(port, () => console.log(`Server running on PORT ${port}`))