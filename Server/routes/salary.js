import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addSalary } from '../controllers/salaryController.js'


const router = express.Router()
router.post('/add', authMiddleWare, addSalary )



export default router