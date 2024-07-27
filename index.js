const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hi, express server here!')
})

app.get('/new-route', (req, res) => {
  res.send('Hey, new route')
})

app.get('/products', (req, res) => {
  // javascript object notation --> Exchange data between clients and servers
  res.json({
    name: "Air Pods",
    price: 100
  })
})

app.listen(port, () => {
  console.log('Mi port: ', port);
})
