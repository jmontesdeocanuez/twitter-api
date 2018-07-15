const router = require('express').Router();
const {getAllUsers, getUserByUsername, deleteUserByUsername, modifyUserByUsername, createUser} = require('./users.controller');

const session = require('express-session');
router.use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: 60000 }, 
    resave: true, 
    saveUninitialized: true}))

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.delete('/:username', deleteUserByUsername);
router.patch('/:username', modifyUserByUsername);
router.post('/', createUser);

module.exports = router;