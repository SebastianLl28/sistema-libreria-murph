import { sendMail } from '../config/emailer'
import { encrypter } from '../helpers/bcrypt.helper'
import { User } from '../interface/User.interface'
import UserModel from '../models/User.model'

const registerUser = async ({ name, lastName, email, password, token }: User): Promise<void> => {
  try {
    const passHash = await encrypter(password)
    await sendMail({ name, lastName, email, token: token as string })
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

const changeUserData = async (id: any, prop: keyof User, value: any): Promise<null | User> => {
  try {
    const update: any = {}
    update[prop] = value
    const user = await UserModel.findByIdAndUpdate(id, update)
    return user
  } catch (err) {
    throw new Error(err as string)
  }
}

const searchUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await UserModel.findById(id)
    return user
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  registerUser,
  emailIsReigster,
  changeUserData,
  searchUserById
}
