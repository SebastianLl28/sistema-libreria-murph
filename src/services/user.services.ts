import { sendMail } from '../config/emailer'
import { encrypter } from '../helpers/bcrypt.helper'
import { User } from '../interface/User.interface'
import UserModel from '../models/User.model'

const registerUser = async ({ name, lastName, email, password, token }: User): Promise<void> => {
  try {
    const passHash = await encrypter(password)
    await sendMail(name, lastName, email, token as string)
    await UserModel.create({ name, lastName, email, password: passHash, token })
  } catch (err) {
    throw new Error(err as string)
  }
}

const emailIsReigster = async (email: string): Promise<boolean> => {
  try {
    const result = await UserModel.findOne({ email })
    if (result === null) {
      return false
    }
    return true
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  registerUser,
  emailIsReigster
}
