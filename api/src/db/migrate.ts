import pg from "postgres";
import chalk from "chalk";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { env } from "../env";

const connection = pg(`postgresql://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DB}`, { max: 1 });

const db = drizzle(connection);

await migrate(db, { migrationsFolder: "drizzle" });

// Success message when running the migration.
console.log(chalk.greenBright("Migration applied successfully."));

// Closing the connection to the database.
await connection.end();

// Ending the process completely.
process.exit();
