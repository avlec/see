const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()

// XXX: Likely remove for prod
process.on('unhandledRejection', (reason, promise) => {
  console.error('Uncaught error in', promise)
  console.error(reason)
  process.exit(1)
})

const logpath = path.join(__dirname, 'access.log')
const logstream = fs.createWriteStream(logpath, { flags: 'a' })

const app = express()
app.disable('x-powered-by')

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(session({
  secret: process.env.SESSION,
  saveUninitialized: false,
  resave: false,
}))

// Routes for the application base
const clientDir = path.join(__dirname, 'client')
const compiledWebpackFiles = path.join(clientDir, 'build')
app.use('/', express.static(compiledWebpackFiles))

// Logic here...
app.post('/uploadFiles', {

})

app.get('/runFilter/:filter/:file', {

})

app.listen(process.env.PORT || 3000, () => {
  console.log((new Date()).toLocaleString())
  console.log(`Listening on ${process.env.PORT}\n`)
})
