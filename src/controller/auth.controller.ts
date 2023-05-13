import { Request, Response } from 'express'
import { changeUserData, emailIsReigster, registerUser } from '../services/user.services'
import { User } from '../interface/User.interface'
import createToken from '../helpers/createToken.helper'
import { searchToken, verifyEmail, verifyTokenAndDelete } from '../services/auth.services'
import { sendEmailPassword } from '../config/emailer'
import { encrypter, verified } from '../helpers/bcrypt.helper'
import { generatejwt } from '../helpers/jwt.helpers'
import { ObjectId } from 'mongoose'

const getLogin = (_req: Request, res: Response): void => {
  res.render('auth/login', {
    pagina: 'Login'
  })
}

const postLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  const user = await verifyEmail(email)

  if (user === null) {
    return res.render('auth/login', {
      pagina: 'login',
      errors: [{ msg: 'Correo o contraseña incorrecta', path: 'correo' }],
      user: { email, password }
    })
  }

  const verifyPassword = await verified(password, user.password)

  if (!verifyPassword) {
    return res.render('auth/login', {
      pagina: 'login',
      errors: [{ msg: 'Correo o contraseña incorrecta', path: 'correo' }],
      user: { email, password }
    })
  }

  const token = generatejwt(user.id as ObjectId, user.name, user.email)

  return res.cookie('_token', token, {
    httpOnly: true
  }).redirect('/app/dashboard')
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

const postRecoverPassword = async (req: Request, res: Response): Promise<void> => {
  // buscar si el email es existente
  const { email } = req.body
  const user = await verifyEmail(email)

  // Si no existe el email
  if (user === null) {
    return res.render('auth/recover-password', {
      pagina: 'Recuperar contraseña',
      errors: [{ msg: 'No hay usuario registrado con el correo electronico', path: 'email' }]
    })
  }

  // Si existe el email pero falta confirmar
  if (!user.confirmed) {
    return res.render('auth/recover-password', {
      pagina: 'Recuperar contraseña',
      errors: [{ msg: 'Falta confirmar cuenta del usuario', path: 'email' }]
    })
  }

  const { name, lastName } = user
  const token = createToken()
  await changeUserData(user.id, 'token', token)
  await sendEmailPassword({ name, lastName, email, token })

  res.render('messages/confirm', {
    pagina: 'Confimación',
    message: 'Se ha enviado un mensaje a su email, proceda a seguir las instructions'
  })
}

const getConfirmAccount = async (req: Request, res: Response): Promise<void> => {
  // Verificar el token
  const { token } = req.params

  const user = await verifyTokenAndDelete(token)

  if (user === null) {
    return res.render('messages/confirm', {
      pagina: 'Confirmación',
      message: 'Al parecer su cuenta ya ha sido confirmado 😬😬😬'
    })
  }

  if (user.confirmed) {
    return res.render('messages/confirm', {
      pagina: 'Confirmación',
      message: 'Al parecer su cuenta ya ha sido confirmado 😬😬😬'
    })
  }

  // Cambiar el estado del usuario a confirmado
  await changeUserData(user.id, 'confirmed', true)

  res.render('messages/confirm', {
    pagina: 'Confirmación',
    message: 'Su cuenta se ha confimado correctamente 🎉🎉, ya puede Iniciar Sesión en el siguiente link',
    confirm: true
  })
}

const getChangePassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params
  const user = await searchToken(token)

  // Si no se encuentra a usuario con el token o si tenga token pero de una cuenta no confirmada
  if (user === null || !user.confirmed) {
    return res.render('messages/confirm', {
      pagina: 'Confirmación',
      message: 'Error en el token, probablemente ya haya cambiado su contraseña'
    })
  }

  res.render('auth/change-password', {
    pagina: 'Cambiar contraseña'
  })
}

const postChangePassword = async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body
  const { token } = req.params

  const result = await verifyTokenAndDelete(token)

  if (result === null) {
    return res.render('messages/confirm', {
      pagina: 'Confirmación',
      message: 'Error al momento de cambiar su contraseña, probablemente ya se haya cambiado'
    })
  }

  const newPassword = await encrypter(password)

  const user = await changeUserData(result.id, 'password', newPassword)

  if (user === null) {
    return res.render('messages/confirm', {
      pagina: 'Confirmación',
      message: 'Error al momento de cambiar su contraseña, probablemente ya se haya cambiado'
    })
  }

  res.render('messages/confirm', {
    pagina: 'Confirmación',
    message: 'Su contraseña ha sido cambiado correctamente 🎉🎉',
    confirm: true
  })
}

export {
  getLogin,
  postLogin,
  postRegister,
  getRegister,
  getRecoverPassword,
  postRecoverPassword,
  getConfirmAccount,
  getChangePassword,
  postChangePassword
}
