import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addLeave, getLeaves } from '../controllers/leaveController.js'


const router = express.Router()
router.post('/add', authMiddleWare, addLeave )
router.get('/:id', authMiddleWare, getLeaves )





export default router