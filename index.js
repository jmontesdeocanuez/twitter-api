const express = require ('express');
const mongoose = require ('mongoose');
const app = express();

const config = require('./.env');
const options = config[process.env.NODE_ENV];
console.log(process.env.NODE_ENV)
const _PORT = options.PORT;
const _DB_URL = options.DB_URL;

const usersRouter = require('./api/users');
const tweetsRouter = require('./api/tweets');

mongoose.connect(_DB_URL);

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/tweets', tweetsRouter);

app.listen(_PORT);