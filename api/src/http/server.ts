import chalk from 'chalk'
import { Elysia } from 'elysia'
import { env } from '../env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'

// Route restaurants
const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)

app.listen(`${env.APP_PORT}`, () => {
  console.log(
    chalk.greenBright(`🚀 HTTP server running in port ${env.APP_PORT}`),
  )
})
