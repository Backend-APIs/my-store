const express = require('express')
const ProductsService = require('../services/products.service')

// SRP (Single Responsability Principle) --> We created a single router for products.
const router = express.Router()

// here with the help of ProductsService, we decoupled the bussiness logic to the service, routing only delegates the access to the logic.
const service = new ProductsService()

// callback that recieves parameters of request and response.
router.get('/', (req, res) => {
  const products = service.find()
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
  const product = service.findOne(id)

  if (!product) {
    return res.status(404).json({ message: "not found" })
  }

  res.json(product)
})
// -------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/', (req, res) => {
  const product = req.body
  const newProduct = service.create(product)
  res.status(201).json(newProduct)
  // save to DB + validations
})

// On PUT you have to send ALL the properties of an object tu update.
router.put("/:id", (req, res) => {
  const product = req.body
  const { id } = req.params
  const productUpdated = service.update(product, id)

  res.json(productUpdated)
})

// On PATCH you can send some properties of an object tu update.
router.patch("/:id", (req, res) => {
  const product = req.body
  const { id } = req.params
  const productUpdated = service.patch(product, id)

  res.json(productUpdated)
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const productIdDeleted = service.delete(id)
  res.json(productIdDeleted)
})

module.exports = router
