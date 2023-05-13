import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

const validateRegisterForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, lastname, email, password } = req.body

  await check('name').notEmpty().withMessage('El nombre es requerido').run(req)
  await check('lastname').notEmpty().withMessage('El apellido es requerido').run(req)
  await check('email').notEmpty().withMessage('El correo es requerido').run(req)
  await check('password').notEmpty().withMessage('La contraseña es requerida').run(req)
  await check('repeatPassword').equals(password).withMessage('Los passwords no son iguales').run(req)

  await check('email').isEmail().withMessage('El formato del Email no es correcta').run(req)
  await check('password').isLength({ min: 6 }).withMessage('El password tiene que tener minimo 6 digitos').run(req)

  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.render('auth/register', {
      pagina: 'Registrar',
      errors: result.array(),
      user: {
        name, lastname, email
      }
    })
  }

  next()
}

export {
  validateRegisterForm
}
