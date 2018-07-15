const USER = require('./users.model');

function getAllUsers(req, res) {
    USER.find()
        .then(response => {
            res.json(response);
        })
}

function getUserByUsername(req, res) {
    const _username = req.params.username;
    USER.findOne({ username: _username })
        .then(response => {
            if (response) {
                res.json(response);
            } else {
                res.status(400).send("There's no user with username="+_username)
            } 
        })
}

function deleteUserByUsername(req, res) {
    const _username = req.params.username;
    USER.findOne({username: _username}, (err, doc) => {
        if(doc){
            doc.remove();
            res.json(doc);
        }else{
            res.status(400).send("There's no user with username="+_username);
        }
    })
}

function modifyUserByUsername(req, res) {
    const _username = req.params.username;
    if (req.body && req.body.email) {
        USER.findOne({"username": _username}, (err, user) => {
            user.email = req.body.email;
            user.save();
            res.json(user);
        });
    }
}

function createUser(req, res) {
    if (req.body){
        const newUser = new USER(req.body);
        newUser.save()
            .then(response => {
                const sendmail = require('sendmail')();
                sendmail({
                    from: 'no-reply@twitterapi.com',
                    to: req.body.email,
                    subject: 'New account on TwitterApi',
                    html: 'Welcome to our TwitterApi! ',
                }, function (err, reply) {
                    console.log(err && err.stack);
                    console.dir(reply);
                });
                res.json(response)
            })
        .catch(response => res.status(400).send('User was not created'));
    }
}

module.exports = {
    getAllUsers, getUserByUsername, deleteUserByUsername, modifyUserByUsername, createUser
}