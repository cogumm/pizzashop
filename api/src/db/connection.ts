import pg from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import { env } from '../env'

const connection = pg(
  `postgresql://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DB}`,
  { max: 1 },
)

export const db = drizzle(connection, { schema })
