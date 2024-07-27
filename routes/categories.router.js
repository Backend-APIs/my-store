const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
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
