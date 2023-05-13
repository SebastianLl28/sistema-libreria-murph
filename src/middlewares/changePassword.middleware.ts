import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

const validateChangePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { password } = req.body

  await check('password').notEmpty().withMessage('La contraseña es necesaria').run(req)
  await check('password').isLength({ min: 6 }).withMessage('La contraseña tiene que tener minimo 6 caracteres').run(req)
  await check('repeatPassword').equals(password).withMessage('Las contraseñas no coinciden').run(req)

  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.render('auth/change-password', {
      pagina: 'gaaa',
      errors: result.array()
    })
  }

  next()
}

export {
  validateChangePassword
}
