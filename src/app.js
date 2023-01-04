import Express  from "express";
import cors from "cors"
import dotenv from "dotenv"

import { routes } from "./router.js";

dotenv.config()

const app = Express()

app.use(cors())
app.use(Express.json())
app.use(routes)

export {
    app
}
