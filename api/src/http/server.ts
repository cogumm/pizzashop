import { Elysia } from 'elysia'
import chalk from 'chalk'
import { env } from '../env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

// Route restaurants
const app = new Elysia().use(registerRestaurant).use(sendAuthLink)

app.listen(`${env.APP_PORT}`, () => {
  console.log(
    chalk.greenBright(`🚀 HTTP server running in port ${env.APP_PORT}`),
  )
})
