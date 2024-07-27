const express = require('express')

// finds index.js automatically
const routerApi = require('./routes')

const app = express()
const port = 3000

// every route (product, category, etc.) has it's own module, which makes the app way more mantainable/scalable.
routerApi(app)

app.listen(port, () => {
  console.log('Mi port: ', port);
})
