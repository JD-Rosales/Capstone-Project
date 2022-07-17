const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()

//request undefined middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/fingerspell', require('./routes/api/fingerspellRoutes'))
app.use('/api/users', require('./routes/api/userRoutes'))

app.listen(port, () => console.log(`Server running on PORT ${port}`))