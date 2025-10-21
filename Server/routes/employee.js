import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import { addEmployee,getEmployees, upload} from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', authMiddleWare, getEmployees )
router.post('/add', authMiddleWare, upload.single('image'), addEmployee )
//router.get('/:id', authMiddleWare, getDepartment )
//router.put('/:id', authMiddleWare, updateDepartment )
//router.delete('/:id', authMiddleWare, deleteDepartment )


export default router