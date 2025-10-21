import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments, getDepartment, updateDepartment,deleteDepartment } from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', authMiddleWare, getDepartments )
router.post('/add', authMiddleWare, addDepartment )
router.get('/:id', authMiddleWare, getDepartment )
router.put('/:id', authMiddleWare, updateDepartment )
router.delete('/:id', authMiddleWare, deleteDepartment )


export default router