import  Express  from "express";
import { validateBodySign, validateBodyTweets, filterUser } from "./middleware/validateDateMiddleWare.js";
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
    const lastTen = []
    let j = 0

    for( let i = tweets.length; i > 0; i--){
        username = tweets[i - 1].username
        const tweet = tweets[i - 1].tweet
        avatar = users.find( element => element.username === username ).avatar
        lastTen.push({username, tweet, avatar})
        j += 1
        if( j === 10 ) break
    }
    return res.send(lastTen)
})

routes.get("/tweets/:username", filterUser, (req, res) => {
    const {username} = req.params

    avatar = users.find( element => element.username === username ).avatar

    const tweetsUser = tweets.map(e => {
        if(e.username === username){
            const tweet = e.tweet
            return{ username, avatar, tweet}
        }
    })
   
    return res.send(tweetsUser)
})


export {
    routes, 
    users
}