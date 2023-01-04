import { users } from "../router.js"

const validateBodySign = (req, res, next) => {
    if(!req.body.username) return res.status(400).send("Todos os campos são obrigatórios!")
    if(!req.body.avatar) return res.status(400).send("Todos os campos são obrigatórios!")
    next()
}

const validateBodyTweets = (req, res, next) => {
    if(!req.body.username) return res.status(400).send("Todos os campos são obrigatórios!")

    const isLogged = users.find( element => 
        element.username === req.body.username
    )
    if(!isLogged) {
        return res.status(401).send("UNAUTHORIZED")
    }

    if(!req.body.tweet) return res.status(400).send("Todos os campos são obrigatórios!")
    next()
}


export {
    validateBodySign,
    validateBodyTweets
}