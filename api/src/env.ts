import { z } from 'zod'

const envSchema = z.object({
  APP_BASE_URL: z.string().url().min(1),
  APP_PORT: z.string().min(1),
  APP_AUTH_REDIRECT_URL: z.string().url().min(1),
  APP_JWT_SECRET_KEY: z.string().min(1),
  PG_USER: z.string().min(1),
  PG_PASSWORD: z.string().min(1),
  PG_DB: z.string().min(1),
  PG_HOST: z.string().min(1),
  PG_PORT: z.string().min(4),
})

export const env = envSchema.parse(process.env)
