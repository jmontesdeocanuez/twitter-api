const TWEET = require('./tweets.model');

function getAllTweets(req, res) {
    let order = req.query.order;
    if (!order) order = 1;
    TWEET.find().sort({"createdAt": order})
        .then(response => {
            res.json(response);
        })
}

function getTweetById(req, res) {
    TWEET.findById(req.params.id)
        .then(response => {
            if (response) {
                res.json(response)
            } else {
                console.log("asd")
                res.status(400).send("There's no tweet with id="+req.params.id)
            }
        })
        .catch(err => res.status(400).send(err))
}

function createNewTweet(req, res) {
    if (req.body){
        let newTweet = req.body;
        req.body.createdAt = Date.now();
        newTweet = new TWEET(newTweet);
        newTweet.save()
        .then(response => res.json(response))
        .catch(response => res.status(400).send('Tweet was not created'));
    }
}

function deleteTweetById(req, res) {
    const id = req.params.id;
    TWEET.findOne({_id: id}, (err, doc) => {
        if(doc){
            doc.remove();
            res.json(doc);
        }else{
            res.status(400).send("There's no tweet with id="+id);
        }
    })
}

module.exports = {
    getAllTweets, createNewTweet, getTweetById, deleteTweetById
}