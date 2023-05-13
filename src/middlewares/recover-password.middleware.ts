import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

const validateRecoverPasswordForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body
  await check('email').notEmpty().withMessage('El correo no puede ir vacío').run(req)

  await check('email').isEmail().withMessage('El formato del correo no es correcto').run(req)

  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.render('auth/recover-password', {
      pagina: 'Recuperar contraseña',
      errors: result.array(),
      user: {
        email
      }
    })
  }

  next()
}

export {
  validateRecoverPasswordForm
}
