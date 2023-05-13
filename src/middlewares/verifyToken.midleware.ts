import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { searchUserById } from '../services/user.services'
import { Request } from '../interface/Request.interface'

const verifiedToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _token } = req.cookies
    if (_token === null) {
      return res.redirect('/auth/login')
    }

    const decoded = jwt.verify(_token, process.env.SECRET_KEY as string)
    const { id } = decoded as jwt.JwtPayload
    const user = await searchUserById(id)
    if (user === null) {
      return res.clearCookie('_token').redirect('/auth/login')
    }
    req.user = user
    next()
  } catch (err) {
    return res.clearCookie('_token').redirect('/auth/login')
  }
}

export default verifiedToken
