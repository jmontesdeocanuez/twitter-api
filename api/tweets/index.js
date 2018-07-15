const router = require('express').Router();
const {getAllTweets, getTweetById, deleteTweetById, createNewTweet} = require('./tweets.controller');

router.get('/', getAllTweets);
router.get('/:id', getTweetById);
router.delete('/:id', deleteTweetById);
router.post('/', createNewTweet)

module.exports = router;