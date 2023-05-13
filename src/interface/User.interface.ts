import { ObjectId } from 'mongoose'
import { Auth } from './Auth.inteface'

export interface User extends Auth {
  id?: ObjectId
  name: string
  lastName: string
  token?: string
  confirmed: boolean
}
