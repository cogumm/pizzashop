import { env } from "bun";
import { Elysia } from "elysia"

const app = new Elysia()
    .get("/", () => {
        return "Hello world!"
    })

app.listen(`${env.APP_PORT}`, () => {
    console.log(`🚀 Server running in port ${env.APP_PORT}`);

})