const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()

//request undefined middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/fingerspell', require('./routes/api/fingerspellRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on PORT ${port}`))