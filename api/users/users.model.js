const mongoose = require ('mongoose');
const USERschema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
    },
    name: String,
    tweets: Array
})

const USER = mongoose.model('user', USERschema);
module.exports = USER;