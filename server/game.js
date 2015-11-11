'use strict'

/* *******************************
   *                             *
   *       HOST FUNCTIONS        *
   *                             *
   ******************************* */

var generateGameID = function(){
	function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	}

	var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
	return guid;}

var Game = function(settings){
	this.leader = settings.leader;
	this.players = [settings.leader];
	this.socketID = null
	this.maxPlayers = settings.maxPlayers;
	this.numRounds = settings.numRounds;
	this.deck = [];
	this.id = generateGameID();
	this.inProgress = false;
	this.votesToStart = 0;
	this.votesToQuit = 0;

	this.startGame = function(){
		this.inProgress = true;
	}

	this.endGame = function(){
		this.inProgress = false;
	}

	this.voteStart = function(){
		if (this.votesToStart === this.players.length) {
			return this.startGame;
		}
		return this.votesToStart++;
	}

	this.voteQuit = function(){
		if (this.votesToQuit === this.players.length) {
			return this.endGame;
		}
		return this.votesToQuit++;
	}

	this.addCards = function(cards, numRounds){
	var deck = [];
	for (var i=0; i<numRounds; i++){
		var cardToAdd = cards[Math.floor(Math.random() * cards.length)];

		if (cards.length === 0) {
			console.log("Ran out of cards to add!");
			return this.deck = deck;
		}

		if (deck.indexOf(cardToAdd) === -1) {
			cards.splice(cards.indexOf(cardToAdd), 1);
			deck.push(cardToAdd);
		}
	}
		return this.deck = deck;
	}}

function createNewGame(settings) { //returns a new game
	var game = new Game(settings);
	game.socketID = this.id;
	this.emit('newGameCreated', game);
}






/* *****************************
   *                           *
   *     PLAYER FUNCTIONS      *
   *                           *
   ***************************** */










/* *************************
   *                       *
   *      GAME LOGIC       *
   *                       *
   ************************* */





module.exports = {
	createNewGame: createNewGame
}