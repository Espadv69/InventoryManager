const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', err })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, price, description, stock } = req.body
    const newProduct = new Product({ name, price, description, stock })
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch(err) {
    res.status(400).json({ message: 'Error creating product:', err})
  }
})

module.exports = router
