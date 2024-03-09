import { Elysia } from "elysia"

const app = new Elysia()
    .get("/", () => {
        return "Hello world!"
    })

app.listen(3001, () => {
    console.log("Server running!");

})