import { Router } from 'express'
import { getConfirmAccount, getLogin, getRecoverPassword, getRegister, postRegister } from '../controller/auth.controller'
import { validateRegisterForm } from '../middlewares/register.middleware'

const router = Router()

router.get('/login', getLogin)
router.get('/register', getRegister)
router.post('/register', validateRegisterForm, postRegister)
router.get('/recover-password', getRecoverPassword)
router.get('/confirmationAccount/:token', getConfirmAccount)

export default router
