const express = require('express')
const cors = require('cors')

// finds index.js automatically
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3000

// Middleware
// let's us use json body from post, put, etc.
app.use(express.json())

const whiteList = ["http://localhost:8080", "https://myapp.com"]

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}

app.use(cors(corsOptions))
// every route (product, category, etc.) has it's own module, which makes the app way more mantainable/scalable.
routerApi(app)

// You have to set the error middlewares after your routing (cause this is the effect).
/* The call order is important as well since if you call errorHandler first it'll send response
to client directly and won't log error in console.
*/
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port: ', port);
})
