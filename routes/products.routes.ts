import express from 'express'
import { getProductById, getProducts } from '../controllers/products.controller';
const router = express.Router()

router.get('/api/products', getProducts)
router.get('/api/products/:productId', getProductById)

export default router;