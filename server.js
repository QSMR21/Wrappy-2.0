if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//Imports
const express = require ('express')
const app = express()
const  expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


//Routes
const indexRouter = require('./routes/index')
const workshopRouter = require('./routes/workshop')


//App Settings
app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({ limit: '16mb', extended: false }))

//MangoDB Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connecté à MangoDB'))

app.use('/', indexRouter)
app.use('/workshop', workshopRouter)

app.listen(process.env.PORT || 3000)


