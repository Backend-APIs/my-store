const express = require('express')
const CategoriesService = require('../services/categories.service')

const router = express.Router()
const service = new CategoriesService()

router.post('/', async (req, res, next) => {
  try {
    const category = await service.create(req.body)
    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res) => {
  const categories = await service.find()
  console.log("categories: ", categories);
  res.json(categories)
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await await service.findOne(id)

    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await service.update(req.body, id)

    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const categoryIdDeleted = await service.delete(id)
    res.json(categoryIdDeleted)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/products', async (req, res) => {
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

router.get('/:categoryId/products/:productId', async (req, res) => {
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
