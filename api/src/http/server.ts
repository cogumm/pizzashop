import { Elysia } from "elysia"
import chalk from "chalk";
import { env } from "../env";

const app = new Elysia()
    .get("/", () => {
        return "Hello world!"
    })

app.listen(`${env.APP_PORT}`, () => {
    console.log(chalk.greenBright(`🚀 Server running in port ${env.APP_PORT}`));
})