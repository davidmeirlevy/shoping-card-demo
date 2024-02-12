import express from 'express'
import { getAllCategories } from '../controllers/categories.controller';
const router = express.Router()

router.get('/api/categories', getAllCategories)

export default router;