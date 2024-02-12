import express from 'express'
import { addProductToCart, getCart, removeProductFromCart } from '../controllers/cart.controller'
const router = express.Router()

router.get('/api/cart', getCart)
// router.post('/api/cart/checkout')

router.post('/api/cart/:productId', addProductToCart)
router.delete('/api/cart/:productId', removeProductFromCart)

export default router;