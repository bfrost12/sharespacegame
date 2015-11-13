'use strict'
var io;
var gameSocket;


/* *************************
   *                       *
   *      GAME LOGIC       *
   *                       *
   ************************* */
var allCards = [
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
]

function displayAnswers(data){
	io.sockets.in(data.gameID).emit('displayAnswers', data.card);
}

/* *******************************
   *                             *
   *       HOST FUNCTIONS        *
   *                             *
   ******************************* */
//Generates a unique game ID for each game
var generateGameID = function(){
	function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	}

	var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
	return guid; 
}

//Creates a new game using this constructor function, then emits that game object back to all users
var Game = function(settings){
	this.leader = settings.leader;
	this.players = [settings.leader];
	this.socketID = null
	this.maxPlayers = settings.maxPlayers;
	this.numRounds = settings.numRounds;
	this.deck = [];
	this.id = generateGameID();
	this.inProgress = false;
	this.round = 0;

	this.addCards = function(numRounds){
	var cards = allCards.slice(0);
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
	game.addCards(); 
	game.socketID = this.id;
	this.emit('newGameCreated', game);
}

//start the game once leader is ready to start the game
function startGame(data){
	console.log("Starting the Game!");
	nextRound(data); //This will send the first card to all users, which in effect initiates the game.
}

function nextRound(data){
	io.sockets.in(data.gameID).emit('nextRound', data.card); //sends the next card for the game, which is included in the data from the game's deck.
}

/* *****************************
   *                           *
   *     PLAYER FUNCTIONS      *
   *                           *
   ***************************** */

//Allows a player to join a game. The data will contain the playerName and gameID
function joinGame(data){
	console.log('Player '+data.playerName+ 'is attempting to join game: '+data.gameID);
	var sock = this;

	var room = gameSocket.manager.rooms['/'+data.gameID];

	if(room != undefined){
		//attach the socket id to the data object
		data.socketID = sock.id;

		//join the room
		sock.join(data.gameID);
		console.log('Player '+data.playerName+ ' joining game: ' +data.gameId);

		//emit an event notifying the clients that the player has joined the room.4
		io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
	}
	else {
		//
		this.emit('error', {message: "This room does not exist."});
	}
}

//Allows a player to add an answer to a card. The data will contain the playerName, playerID, gameID and answer
function addAnswer(data) {
	console.log(data.playerName+" has answered the current card.");
	io.sockets.in(data.gameID).emit('addAnswer', data);
}

//Allows a player to submit a vote for a particular answer. The data will contain the playerName, gameID, answer and vote
function addVote(data) {
	console.log(data.playerName+" has voted!");
	io.sockets.in(data.gameID).emit('addVote', data);



module.exports = function initGame(sio, socket) {
	io = sio;
	gameSocket = socket;
	gameSocket.emit('connected', {message: 'You are connected!'});

	//Host Events
	gameSocket.on('createNewGame', createNewGame);
	gameSocket.on('startGame', startGame); // only the leader can start the game (controlled on the front end).
	
	//Game Events
	gameSocket.on('displayAnswers', displayAnswers);

	//Player Events
	gameSocket.on('joinGame', joinGame);
	gameSocket.on('addAnswer', addAnswer);
	gameSocket.on('addVote', addVote);
}
}
