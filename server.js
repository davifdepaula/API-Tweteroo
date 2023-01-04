import { app } from "./src/app.js"

const port = process.env.Port || 5000

app.listen(port, () => {
    console.log(`executando porta ${ port }`)
})