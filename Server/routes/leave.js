import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addLeave, getLeave,getLeaves,getLeaveDetail,updateLeave } from '../controllers/leaveController.js'


const router = express.Router()
router.get('/detail/:id', authMiddleWare, getLeaveDetail )
router.get('/:id/:role', authMiddleWare, getLeave )
router.get('/', authMiddleWare, getLeaves )
router.post('/add', authMiddleWare, addLeave )
router.put('/:id', authMiddleWare, updateLeave)







export default router