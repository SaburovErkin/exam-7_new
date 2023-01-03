import { Router } from 'express'
import directionController from '../controllers/direction.controller.js'



const router = Router()


router.get('/directions', directionController.GET)


export default router