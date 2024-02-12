import express from 'express'
import brandsRouter from './brands.routes'
import categoriesRouter from './categories.routes'
import productsRouter from './products.routes'
import cartRouter from './cart.routes'

const router = express.Router()

router.use(brandsRouter)
router.use(categoriesRouter)
router.use(productsRouter)
router.use(cartRouter)


export default router