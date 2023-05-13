import { Request as RequestExpress } from 'express'
import { User } from './User.interface'

export interface Request extends RequestExpress {
  user?: User
}
