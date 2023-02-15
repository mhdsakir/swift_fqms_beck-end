const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const authJwt = require('./auth/jwt')
const errorHandler = require('./auth/errorHandler')

app.use(cors())
// http request
app.options('*', cors())

// for indentify post request json file format (Middleware)
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(errorHandler)

const api = process.env.API_URL


// import routers
const shedOwnerRouter = require('./routes/shedOwners')
const vehiOwnerRouter = require('./routes/vehiOwners')
const shedRouter = require('./routes/sheds')
const feedRouter = require('./routes/feeds')

// set api routers
app.use(`${api}/shedown`, shedOwnerRouter)
app.use(`${api}/vehiown`, vehiOwnerRouter)
app.use(`${api}/shed`, shedRouter)
app.use(`${api}/feed`, feedRouter)


// connect db
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    console.log('Database connection is ready......')
})
.catch((err) => {
    console.log(err)
})