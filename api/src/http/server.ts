import chalk from 'chalk'
import { Elysia, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '../env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

// Route restaurants
const app = new Elysia()
  .use(
    jwt({
      secret: env.APP_JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantId: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie())
  .use(registerRestaurant)
  .use(sendAuthLink)

app.listen(`${env.APP_PORT}`, () => {
  console.log(
    chalk.greenBright(`🚀 HTTP server running in port ${env.APP_PORT}`),
  )
})
