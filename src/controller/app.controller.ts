import { Response } from 'express'
import { Request } from '../interface/Request.interface'

const getDashboard = async (req: Request, res: Response): Promise<void> => {
  res.render('app/dashboard', {
    title: 'Dashboard',
    user: req.user
  })
}

const postLogout = async (_req: Request, res: Response): Promise<void> => {
  return res.clearCookie('_token').redirect('/auth/login')
}

export {
  getDashboard,
  postLogout
}
