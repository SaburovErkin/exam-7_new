import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'
import checkToken from '../middlewares/checkToken.js'



const router = Router()

router.get('/admins', adminController.GET)
router.post('/login', adminController.LOGIN)
router.post('/register', adminController.REGISTER)


export default router