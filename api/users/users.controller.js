const USER = require('./users.model');
const sendmail = require('sendmail')();


function checkSession(req){
    if(req.session.views){
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    if(req.session.views > 100){
        sendmail({
            from: 'no-reply@twitterapi.com',
            to: "jmontesdeocanuez21@gmail.com",
            subject: "Warning!",
            html: "Someone is using your api in an anomalous way. Check it!"
        })

    }
}

function addTweetToUser(owner, tweet){
    USER.findOne({"username": owner}, (err, user) => {
        user.tweets = [...user.tweets, tweet];
        user.save();
    });
}

function getAllUsers(req, res) {
    checkSession(req);
    USER.find()
        .then(response => {
            res.json(response);
        })
}

function getUserByUsername(req, res) {
    checkSession(req);
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
    checkSession(req);
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
    checkSession(req);
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
    checkSession(req);
    if (req.body){
        const newUser = new USER(req.body);
        newUser.save()
            .then(response => {
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
    getAllUsers, getUserByUsername, deleteUserByUsername, modifyUserByUsername, createUser, addTweetToUser
}
