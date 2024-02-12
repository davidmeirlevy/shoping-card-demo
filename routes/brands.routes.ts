import express from 'express'
import { getAllBrands } from '../controllers/brands.controller';
const router = express.Router()

router.get('/api/brands', getAllBrands)

export default router;