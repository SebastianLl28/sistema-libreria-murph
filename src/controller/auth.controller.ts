import { Request, Response } from 'express'
import { emailIsReigster, registerUser } from '../services/user.services'
import { User } from '../interface/User.interface'
import createToken from '../helpers/createToken.helper'
import { verifyTokenAndDelete } from '../services/auth.services'

const getLogin = (_req: Request, res: Response): void => {
  res.render('auth/login', {
    pagina: 'Login'
  })
}

const getRegister = (_req: Request, res: Response): void => {
  res.render('auth/register', {
    pagina: 'Registrar'
  })
}

const postRegister = async (req: Request, res: Response): Promise<void> => {
  const { name, lastname, email, password } = req.body

  const isRegister = await emailIsReigster(email)

  if (isRegister) {
    // Si el usuario está registrado
    return res.render('auth/register', {
      pagina: 'Registrar',
      errors: [{ msg: 'El correo ya está registrado', path: 'email' }],
      user: {
        name, lastname, email
      }
    })
  }

  // Crear token
  const token = createToken()

  // crear usuario
  const user: User = { name, lastName: lastname, email, password, token, rol: 'user', confirmed: false }
  await registerUser(user)

  // Redireccionar que el email fue envieado
  res.render('messages/confirm', {
    pagina: 'Confimación',
    message: 'Se ha enviado un mensaje a su email'
  })

  // Crear ruta confirmationAccount/:token
}

const getRecoverPassword = (_req: Request, res: Response): void => {
  res.render('auth/recover-password', {
    pagina: 'Recover Password'
  })
}

const getConfirmAccount = async (req: Request, res: Response): Promise<void> => {
  // Verificar el token
  const { token } = req.params

  const verify = await verifyTokenAndDelete(token)

  if (verify === null) {
    return res.render('messages/confirm', {
      pagina: 'Confirmación',
      message: 'Al parecer su cuenta ya ha sido confirmado 😬😬😬'
    })
  }

  res.render('messages/confirm', {
    pagina: 'Confirmación',
    message: 'Su cuenta se ha confimado correctamente 🎉🎉, ya puede Iniciar Sesión en el siguiente link',
    confirm: true
  })
}

export {
  getLogin,
  postRegister,
  getRegister,
  getRecoverPassword,
  getConfirmAccount
}
