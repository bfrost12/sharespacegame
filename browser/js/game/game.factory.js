app.factory('GameFactory', function($http){
	function startNewGame(settings) {
		return $http.post('/api/game/newGame', settings).then(function(res){
			return res.data;
		});
	}

	function addPlayer(name, game) {
		return $http.post('/api/game/newPlayer', name).then(function(res){
			game.players.push(res.data);
		});
	}

	return {
		startNewGame: startNewGame,
		addPlayer: addPlayer
	}
})