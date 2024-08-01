const express = require('express')
const ProductsService = require('../services/products.service')

// SRP (Single Responsability Principle) --> We created a single router for products.
const router = express.Router()

// here with the help of ProductsService, we decoupled the bussiness logic to the service, routing only delegates the access to the logic.
const service = new ProductsService()

// callback that recieves parameters of request and response.
router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})


// -------------------------------------------------------------------------------------------------------------------------------------------------
// specific routes must go first, dynamic routes must go afterwards. Cause if this doesn’t hrouteren the specific routes gets confused as a param.

// specific route
router.get('/filter', async (req, res) => {
  res.send("I'm a filter")
})

// dynamic route
router.get('/:id', async (req, res, next) => {
  try {
    // destructure the param id.
    const { id } = req.params
    const product = await service.findOne(id)

    if (!product) {
      return res.status(404).json({ message: "not found" })
    }

    res.json(product)
  } catch (error) {
    next(error)
  }

})
// -------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
  const product = req.body
  const newProduct = await service.create(product)
  res.status(201).json(newProduct)
  // save to DB + validations
})

// On PUT you have to send ALL the properties of an object tu update.
router.put("/:id", async (req, res) => {
  try {
    const product = req.body
    const { id } = req.params
    const productUpdated = await service.update(product, id)

    res.json(productUpdated)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

// On PATCH you can send some properties of an object tu update.
router.patch("/:id", async (req, res) => {
  try {
    const product = req.body
    const { id } = req.params
    const productUpdated = await service.patch(product, id)

    res.json(productUpdated)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const productIdDeleted = await service.delete(id)
  res.json(productIdDeleted)
})

module.exports = router
