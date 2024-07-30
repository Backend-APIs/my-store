const express = require('express')
const { faker } = require('@faker-js/faker')

// SRP (Single Responsability Principle) --> We created a single router for products.
const router = express.Router()

// callback that recieves parameters of request and response.
router.get('/', (req, res) => {
  // javascript object notation --> Exchange data between clients and servers
  const { size } = req.query
  const limit = size || 10

  const products = []
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
    })

  }
  res.json(products)
})


// -------------------------------------------------------------------------------------------------------------------------------------------------
// specific routes must go first, dynamic routes must go afterwards. Cause if this doesn’t hrouteren the specific routes gets confused as a param.

// specific route
router.get('/filter', (req, res) => {
  res.send("I'm a filter")
})

// dynamic route
router.get('/:id', (req, res) => {
  // destructure the param id.
  const { id } = req.params
  res.json({
    id: id,
    name: "Air Pods",
    price: 100
  })
})
// -------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/', (req, res) => {
  const product = req.body
  console.log("product: ", product);

  res.json({ message: "created", data: product })
  // save to DB + validations
})

// On PUT you have to send ALL the properties of an object tu update.
router.put("/:id", (req, res) => {
  const product = req.body
  const { id } = req.params
  // update to DB + validations
  res.json({ message: "updated", data: product, id })
})

// On PATCH you can send some properties of an object tu update.
router.patch("/:id", (req, res) => {
  const product = req.body
  const { id } = req.params
  // update to DB + validations
  res.json({ message: "updated", data: product, id })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  res.json({ message: "deleted", id })
})

module.exports = router
