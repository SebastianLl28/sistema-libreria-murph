import { User } from '../interface/User.interface'
import UserModel from '../models/User.model'

const verifyTokenAndDelete = async (token: string): Promise<null | User> => {
  try {
    const user = await UserModel.findOne({ token })
    if (user === null) {
      return null
    }
    await user.updateOne({ token: '' })
    return user
  } catch (err) {
    throw new Error(err as string)
  }
}

const searchToken = async (token: string): Promise<null | User> => {
  try {
    const user = await UserModel.findOne({ token })
    return user
  } catch (err) {
    throw new Error(err as string)
  }
}

const verifyEmail = async (email: string): Promise<null | User> => {
  try {
    const user = await UserModel.findOne({ email })
    // if (user === null) {
    //   return null
    // }
    return user
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  verifyTokenAndDelete,
  searchToken,
  verifyEmail
}
