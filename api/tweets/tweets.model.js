const mongoose = require ('mongoose');
const TWEETschema = mongoose.Schema({
    //no le pongo id pq se lo pone mongo
    text:{
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: Number
})
const TWEET = mongoose.model('tweet', TWEETschema);
module.exports = TWEET;