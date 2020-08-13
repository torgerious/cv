const express = require('express')
const app = express()

// layout stuff
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.use(express.static('public'))   // PUBLIC STATIC FILES
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') // __dirname = current directory
app.set('layout', 'layouts/layout')

// body parse
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// hente routes
const indexRouter = require('./routes/index')       // henter indexRoute fra index route (via modules.exports)
const calculatorRouter = require('./routes/calculator')       // henter indexRoute fra index route (via modules.exports)


// use routes
app.use('/', indexRouter)           
app.use('/calculator', calculatorRouter)           

app.listen(process.env.PORT || 8080)