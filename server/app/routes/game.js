'use strict'
var router = require('express').Router();
var Card = require('../../db/models/card');
var Game = require('../../game');
var Player = require('../../player');
var User = require('../../db/models/user');

//Game Routes: Basic route to initiate a new game and send it to the frontend
router.post('/newGame', function(req, res){
	var settings = req.body;
	var game = Game.createNewGame(settings);
	Card.find({}).then(function(cards){
		game.addCards(cards, settings.numRounds);
		return game;
	})
	.then(function(game){
		res.json(game);
	})
});

router.post('/newPlayer', function(req, res){
	var name = req.body.name;
	var newPlayer = Player.newPlayer(name);
	res.json(newPlayer);
})


//Card Routes: Very basic routes for getting cards from the database and saving new cards we create, and deleting them.
router.get('/cards', function(req, res){
	Card.find({}).then(function(deck){
		res.json(deck);
	});
});

router.post('/card', function(req, res){
	var cardData = req.body;
	Card.create(cardData).then(function(newCard){
		res.json(newCard);
	});
});

//delete all cards
router.delete('/cards', function(req, res){
	Card.remove({}).then(function(removed){
		console.log(removed);
		res.send("Removed "+removed.result.n+" cards from the database.");
	});
});

//delete one card
router.delete('/card/:id', function(req, res){
	console.log(req.params);
	Card.findOne({_id: req.params.id}).then(function(card){
		Card.remove(card).then(function(removed){
			res.send(removed);
		});
	})
});

//add player name to user
router.post('/playername', function(req, res){
	User.findOneAndUpdate({_id: req.params.id},
		{$set: {playername: req.params.playername}},
		{new: true})
		.then(function(user){
			res.json(user);
		})
})

//find all users
router.get('/users', function(req, res){
	User.find({}).then(function(users){
		res.json(users);
	})
});

//delete all users
router.delete('/users', function(req, res){
	User.remove({}).then(function(removed){
		res.json(removed);
	});
})

module.exports = router;
