import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { searchUserById } from '../services/user.services'

const checkLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _token } = req.cookies
    if (_token === null) {
      // return res.render('aut/login', {
      //   pagina: 'Login'
      // })
      next()
    }

    const decoded = jwt.verify(_token, process.env.SECRET_KEY as string)
    const { id } = decoded as jwt.JwtPayload
    const user = await searchUserById(id)
    if (user === null) {
      return res.clearCookie('_token').redirect('/auth/login')
    }
    return res.redirect('/app/dashboard')
  } catch (err) {
    next()
    // return res.render('auth/login', {
    //   pagina: 'Login'
    // })
  }
}

const validateLoginForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  await check('password').notEmpty().withMessage('La contraseña es necesaria').run(req)
  await check('email').notEmpty().withMessage('El Correo es necesaria').run(req)
  await check('email').isEmail().withMessage('El correo no tiene el formato correcto').run(req)

  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.render('auth/login', {
      pagina: 'login',
      errors: result.array(),
      user: { email, password }
    })
  }

  next()
}

export {
  validateLoginForm,
  checkLoggedIn
}
