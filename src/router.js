import  Express  from "express";

const routes = Express.Router()

let username, avatar
const users = []
const tweets = []

routes.post('/sign-up', (req, res) => {
    username = req.body.username
    avatar = req.body.avatar
    users.push({username, avatar})
    return res.send("ok")
})

routes.post('/tweets', (req,res) => {
    username = req.body.username
    if(!users.find( element => {
        element.username === username
    })) {
        return res.send("UNAUTHORIZED")
    }
    const tweet = req.body.tweet
    tweets.push({username, tweet})
    return res.send("ok")

})

routes.get( '/tweets', ( req, res ) => {
    const lastTen = []
    let j = 1

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


export {
    routes
}