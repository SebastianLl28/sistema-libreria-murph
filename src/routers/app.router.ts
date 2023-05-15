import { Router } from 'express'
import { getDashboard, postLogout } from '../controller/app.controller'
import verifiedToken from '../middlewares/verifyToken.midleware'

const router = Router()

router.get('/dashboard', verifiedToken, getDashboard)

router.post('/logout', postLogout)

export default router
