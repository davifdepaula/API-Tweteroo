import { users } from "../router.js"

const validateBodySign = (req, res, next) => {
    if(!req.body.username) return res.status(400).send("Todos os campos são obrigatórios!")
    if(typeof req.body.username !== "string") return res.status(400).send("O nome de usuário precisa ser uma string")
    if(!req.body.avatar) return res.status(400).send("Todos os campos são obrigatórios!")
    if(typeof req.body.avatar !== "string") return res.status(400).send("O avatar de usuário precisa ser uma string")
    next()
}

const validateBodyTweets = (req, res, next) => {
    if(!res.get("user")) return res.status(400).send("Todos os campos são obrigatórios!")

    const isLogged = users.find( element => 
        element.username === res.get("user")
    )
    if(!isLogged) {
        return res.status(200).send("UNAUTHORIZED")
    }

    if(!req.body.tweet) return res.status(400).send("Todos os campos são obrigatórios!")
    if(typeof req.body.tweet !== "string") return res.status(400).send("O tweet precisa ser uma string")
    next()
}

const filterUser = (req, res, next) => {

    const didTweet = users.find( element => 
        element.username === req.params.username
    )
    
    if (!didTweet) return res.send([])
    next()
}


export {
    validateBodySign,
    validateBodyTweets,
    filterUser
}