import { Router } from 'express'
import { getDashboard } from '../controller/app.controller'
import verifiedToken from '../middlewares/verifyToken.midleware'

const router = Router()

router.get('/dashboard', verifiedToken, getDashboard)

export default router
