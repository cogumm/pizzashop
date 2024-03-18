import { Elysia, t } from 'elysia'
import chalk from 'chalk'
import { env } from '../env'
import { db } from '../db/connection'
import { restaurants, users } from '../db/schema'

// Route restaurants
const app = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, description, managerName, email, phone } = body

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'manager',
      })
      .returning({
        id: users.id,
      })

    await db.insert(restaurants).values({
      name: restaurantName,
      description,
      managerId: manager.id,
    })

    set.status = 204
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      description: t.String(),
      managerName: t.String(),
      phone: t.String(),
      email: t.String({ format: 'email' }),
    }),
  },
)

app.listen(`${env.APP_PORT}`, () => {
  console.log(
    chalk.greenBright(`🚀 HTTP server running in port ${env.APP_PORT}`),
  )
})
