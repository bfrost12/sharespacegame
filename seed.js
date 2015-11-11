/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Card = Promise.promisifyAll(mongoose.model('Card'));
var User = Promise.promisifyAll(mongoose.model('User'));

var seedUsers = function () {
        var users = [
    {
        email: 'testing@fsa.com',
        password: 'password',
        playername: 'testplayer'
    },
    {
        email: 'obama@gmail.com',
        password: 'potus',
        playername: 'leaderofthefreeworld'
    }
];

return User.createAsync(users);
};
var seedCards = function () {
       var cards = [
    {
        title: 'Pay Day',
        prompt: 'How I feel on pay day:',
        color: 'purple',
        answers: [],
        points: 5
    },
    {
        title: 'Test Card',
        prompt: 'This is a test card. Fill in the ____ with any word you want.',
        color: 'blue',
        answers: [],
        points: 5
    },
    {
        title: 'Cats',
        prompt: 'This is the best cat meme ever',
        color: 'purple',
        answers: [], 
        points: 10
    },
    {
        title: 'The World Go Round',
        prompt: '_______ makes the world go \'round',
        color: 'blue',
        answers: [],
        points: 20
    },
    {
        title: 'Dog',
        prompt: 'If I had a dog, I\'d totally name him ______.',
        color: 'blue',
        answers: [], 
        points: 15
    },
];

return Card.createAsync(cards);
};

connectToDb.then(function () {
    Card.findAsync({}).then(function (cards) {
        if (cards.length === 0) {
            return seedCards();
        } else {
            console.log(chalk.magenta('Replacing '+cards.length+' cards in the database.'));
            return seedCards();
        }
    })
    .then(function() {
        User.findAsync({}).then(function (users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Replacing '+users.length+' users in the database.'));
                return seedUsers();
            }
        })
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});