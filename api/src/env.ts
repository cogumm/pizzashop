import { z } from 'zod'

const envSchema = z.object({
  APP_PORT: z.string().min(1),
  PG_USER: z.string().min(1),
  PG_PASSWORD: z.string().min(1),
  PG_DB: z.string().min(1),
  PG_HOST: z.string().min(1),
  PG_PORT: z.string(),
})

export const env = envSchema.parse(process.env)
