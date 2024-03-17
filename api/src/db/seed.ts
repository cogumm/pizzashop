/* eslint-disable drizzle/enforce-delete-with-where */

import { faker } from '@faker-js/faker'
import { users, restaurants } from './schema'
import { db } from './connection'
import chalk from 'chalk'

/**
 * Reset database
 */
await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('✅ Database reset!'))

/**
 * Create customers.
 */
await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])
console.log(chalk.yellow('✅ Created customers!'))

/**
 * Create manager.
 */
const [resultIdManager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({
    id: users.id,
  })
// drizzle's "returning" returns all entered information.
console.log(chalk.yellow('✅ Created manager!'))

/**
 * Create restaurant
 */
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: resultIdManager.id,
  },
])
console.log(chalk.yellow('✅ Created restaurant!'))

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()
