import { Schema, model } from 'mongoose'
import { User } from '../interface/User.interface'

const userSchema = new Schema<User>({
  name: {
    type: 'string',
    required: true
  },
  lastName: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  token: {
    type: 'string',
    required: true
  },
  confirmed: {
    type: 'boolean',
    default: false
  },
  rol: {
    type: 'String',
    required: true,
    default: 'user'
  }
},
{
  timestamps: true,
  versionKey: false
}
)

const UserModel = model('user', userSchema)
export default UserModel
