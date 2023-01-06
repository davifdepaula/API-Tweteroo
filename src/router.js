import  Express  from "express";
import { validateBodySign, validateBodyTweets } from "./middleware/validateDateMiddleWare.js";
const routes = Express.Router()

let username, avatar
const users = []
const tweets = []

routes.post('/sign-up', validateBodySign, (req, res) => {
    username = req.body.username
    avatar = req.body.avatar
    users.push({username, avatar})
    return res.status(201).send({"message": "ok"})
})

routes.use('/tweets', (req, res, next) => {
    res.set({
        'user': `${username}`
    });
 
    next();
})

routes.post('/tweets', validateBodyTweets, (req,res) => {
    username = res.get("user")
    const tweet = req.body.tweet
    tweets.push({username, tweet})
    return res.status(201).send({"message": "ok"})

})

routes.get( '/tweets', ( req, res ) => {
    const {page} = req.query
    if(page < 1) return res.status(400).send("Informe uma página válida!")
    const lastTen = []
    let j = 0
    let i = tweets.length
    if(page > 1) i = i - 10*page
    if( i < 0 ) i = -i
    while( (i > 0 || j < 10 ) && tweets[i - 1] !== undefined){
        username = tweets[i - 1].username
        const tweet = tweets[i - 1].tweet
        avatar = users.find( element => element.username === username ).avatar
        lastTen.push({username, tweet, avatar})
        j += 1
        i -= 1
        if( j === 10 ) break
    }
    return res.send(lastTen)
})

routes.get("/tweets/:username", (req, res) => {
    const {username} = req.params

    const didTweet = users.find( element => 
        element.username === username
    )
    
    if (!didTweet) return res.send([])

    avatar = users.find( element => element.username === username ).avatar

    const tweetsUser = tweets.filter(e => {
        if(e.username === username){
            const tweet = e.tweet
            return{ username, avatar, tweet}
        }
    })
    return res.status(200).send(tweetsUser)
})


export {
    routes, 
    users
}