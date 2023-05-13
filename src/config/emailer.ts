import nodemailer from 'nodemailer'
import 'dotenv/config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const createTransport = (): nodemailer.Transporter<SMTPTransport.SentMessageInfo> => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT as string),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  return transport
}

const sendMail = async (name: string, lastName: string, email: string, token: string): Promise<void> => {
  const transport = createTransport()

  const info = await transport.sendMail({
    from: 'libreriaMurph@gmail.com',
    to: email,
    subject: 'This is Subject',
    html: `<h1>Hola ${name} ${lastName}, para confirmar su cuenta tiene que hacer click en el siguiente enlace</h1><a href=${process.env.BACKEND_URL as string}:${process.env.PORT as string}/auth/confirmationAccount/${token}>Confirme su cuenta </a>`,
    text: `Hola ${name} ${lastName}, confirme su cuenta en la página de Murph`
  })

  console.log(`Mensaje enviado: ${info.messageId}`)
}

export {
  sendMail
}
