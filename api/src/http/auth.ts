import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.APP_JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .derive({ as: 'scoped' }, ({ jwt, cookie: { auth } }) => {
    return {
      // Sign-in user.
      signUser: async (payload: Static<typeof jwtPayload>) => {
        // Signing the JWT.
        const token = await jwt.sign(payload)

        // Saving application cookie tokens.
        auth.value = token
        auth.httpOnly = true
        auth.maxAge = 60 * 60 * 24 * env.APP_LINK_DAYS_EXPIRED_IN // in days
        auth.path = '/'
      },

      // Logout user.
      signOut: () => {
        auth.remove()
      },
    }
  })
