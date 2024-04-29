import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import dayjs from 'dayjs'
import { env } from '../../env'
import { auth } from '../auth'
import { authLinks } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, jwt, cookie: { auth }, set }) => {
    const { code, redirect } = query

    // Checking if the code is valid.
    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields, { eq }) {
        return eq(fields.code, code)
      },
    })
    // If not found, return an error.
    if (!authLinkFromCode) {
      throw new Error('Auth link not found.')
    }

    // Validating whether the link is still valid.
    const daysSinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daysSinceAuthLinkWasCreated > env.APP_LINK_DAYS_EXPIRED_IN) {
      throw new Error('Auth link expired, please generate a new one.')
    }

    // If everything went well, generate the user's jwt with the restaurantId.
    const managerRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.managerId, authLinkFromCode.userId)
      },
    })

    // Signing the JWT.
    const token = await jwt.sign({
      sub: authLinkFromCode.userId,
      restaurantId: managerRestaurant?.id,
    })

    // Saving application cookie tokens.
    auth.value = token
    auth.httpOnly = true
    auth.maxAge = 60 * 60 * 24 * env.APP_LINK_DAYS_EXPIRED_IN // in days
    auth.path = '/'

    // If the authentication process went well, the link is deleted so that it cannot be reused.
    await db.delete(authLinks).where(eq(authLinks.code, code))

    // Redirecting the user.
    set.redirect = redirect
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
)
