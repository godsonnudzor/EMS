import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addLeave, getLeave,getLeaves,getLeaveDetail } from '../controllers/leaveController.js'


const router = express.Router()
router.post('/add', authMiddleWare, addLeave )
router.get('/:id', authMiddleWare, getLeave )
router.get('/detail/:id', authMiddleWare, getLeaveDetail )
router.get('/', authMiddleWare, getLeaves )






export default router