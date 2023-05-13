import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ObjectId } from 'mongoose'

const generatejwt = (id: ObjectId, name: string, email: string): string => jwt.sign({
  id, name, email
}, process.env.SECRET_KEY as string, {
  expiresIn: '1d'
})

export {
  generatejwt
}
