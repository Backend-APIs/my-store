const express = require('express')
const CategoriesService = require('../services/categories.service')

const router = express.Router()
const service = new CategoriesService()

router.post('/', (req, res) => {
const category = service.create(req.body)
res.status(201).json(category)
})

router.get('/', (req, res) => {
  const categories = service.find()
  res.json(categories)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const category = service.findOne(id)

  if (!category) {
    return res.status(404).json({message: "category not found"})
  }

  res.json(category)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const category = service.update(req.body, id)

  res.json(category)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const categoryIdDeleted = service.delete(id)
  res.json(categoryIdDeleted)
})

router.get('/:id/products', (req, res) => {
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

router.get('/:categoryId/products/:productId', (req, res) => {
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

module.exports = router
