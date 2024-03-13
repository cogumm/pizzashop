import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
    schema: "./src/db/schema/index.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: `postgresql://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DB}`
    }
} satisfies Config;