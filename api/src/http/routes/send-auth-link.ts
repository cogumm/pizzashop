import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { createId } from '@paralleldrive/cuid2'
import { authLinks } from '../../db/schema'
import { env } from '../../env'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    // Returning the first email found according to the conditions.
    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    // Validating if the email was found.
    if (!userFromEmail) {
      throw new Error('User not found.')
    }

    // Creating the authentication link.
    const authLinkCode = createId()

    // Inserting the created link into the database.
    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    // Sending the email for authentication.
    const authLink = new URL(
      '/auth-links/authenticate',
      `${env.APP_BASE_URL}:${env.APP_PORT}`,
    )
    authLink.searchParams.set('code', authLinkCode)
    // http://localhost:3001//auth-links/authenticate?code=CODE

    // After the user clicks on the link he will be sent to the following link.
    authLink.searchParams.set('redirect', env.APP_AUTH_REDIRECT_URL)

    console.log(authLink.toString())
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
