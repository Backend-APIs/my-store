const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hi, express server here!')
})

app.get('/new-route', (req, res) => {
  res.send('Hey, new route')
})

// callback that revieves parameters of request and response.
app.get('/products', (req, res) => {
  // javascript object notation --> Exchange data between clients and servers
  res.json([
    {
      id: 1,
      name: "Air Pods",
      price: 10
    }, {
      id: 2,
      name: "MacBook Pro",
      price: 1000
    }
  ])
})

app.get('/products/:id', (req, res) => {
  // destructure the param id.
  const { id } = req.params
  res.json({
    id: id,
    name: "Air Pods",
    price: 100
  })
})

app.get('/categories', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Tecnology"
    },
    {
      id: 2,
      name: "Home"
    },
    {
      id: 3,
      name: "Travel"
    }
  ])
})

app.get('/categories/:id/products', (req, res) => {
  const { id } = req.params

  res.json([
    {
      id: 1,
      name: "Air Pods",
      price: 10
    }, {
      id: 2,
      name: "MacBook Pro",
      price: 1000
    }, {
      id: 3,
      name: "iPod",
      price: 15
    }
  ])
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  console.log(`categoryId: ${categoryId} | productId: ${productId}`);
  res.json(
    {
      id: productId,
      categoryId: categoryId,
      name: "Air Pods",
      price: 10
    }
  )
})

app.listen(port, () => {
  console.log('Mi port: ', port);
})
