const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')


const port = process.env.PORT || 5000

connectDB()
const app = express()
const {errorHandler} = require('./middleware/errorMiddleware')


app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/investors' , require('./routes/investorRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))