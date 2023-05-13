import express, { Request, Response } from 'express'
import db from './config/mongo'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
// import { doubleCsrf } from 'csrf-csrf'

import { routerApp, routerAuth } from './routers'

const app = express()

// ? connection db
db().then(() => console.log('success connection db')).catch((err) => console.log(err))

// ? Habilitar el formulario
app.use(express.urlencoded({ extended: true }))

// ? Habilitar cookie parser
app.use(cookieParser())

// ? Active CSRF token
// const { doubleCsrfProtection } = doubleCsrf({
//   getSecret: () => 'secret'
// })

// app.use(doubleCsrfProtection)

// ? Carpeta publica
app.use(express.static('./src/public'))

// ? Set: Para agregar configuración
app.set('view engine', 'pug')
app.set('views', './src/views')

// ? Index
app.get('/', (_req: Request, res: Response) => {
  res.render('index')
})

// ?Routers
app.use('/auth', routerAuth)
app.use('/app', routerApp)

const PORT = parseInt(process.env.PORT as string)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
