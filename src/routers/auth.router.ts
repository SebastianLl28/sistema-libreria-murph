import { Router } from 'express'
import { getChangePassword, getConfirmAccount, getLogin, getRecoverPassword, getRegister, postChangePassword, postLogin, postRecoverPassword, postRegister } from '../controller/auth.controller'
import { validateRegisterForm } from '../middlewares/register.middleware'
import { validateRecoverPasswordForm } from '../middlewares/recover-password.middleware'
import { validateChangePassword } from '../middlewares/changePassword.middleware'
import { checkLoggedIn, validateLoginForm } from '../middlewares/login.midlewares'

const router = Router()

router.get('/login', checkLoggedIn, getLogin)
router.post('/login', validateLoginForm, postLogin)

router.get('/register', getRegister)
router.post('/register', validateRegisterForm, postRegister)

router.get('/recover-password', getRecoverPassword)
router.post('/recover-password', validateRecoverPasswordForm, postRecoverPassword)

router.get('/confirmationAccount/:token', getConfirmAccount)

router.get('/changePassword/:token', getChangePassword)
router.post('/changePassword/:token', validateChangePassword, postChangePassword)

export default router
