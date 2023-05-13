import UserModel from '../models/User.model'

const verifyTokenAndDelete = async (token: string): Promise<null | boolean> => {
  try {
    const user = await UserModel.findOne({ token })
    if (user === null) {
      return null
    }
    await user.updateOne({ token: '' })
    return true
  } catch (err) {
    throw new Error(err as string)
  }
}

export {
  verifyTokenAndDelete
}
