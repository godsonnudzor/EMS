import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addLeave } from '../controllers/leaveController.js'


const router = express.Router()
router.post('/add', authMiddleWare, addLeave )





export default router