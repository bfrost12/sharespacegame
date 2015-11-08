app.factory('GameFactory', function($http){
	function startNewGame(settings) {
		console.log("I was called!");
		return $http.post('/api/game/newGame', settings).then(function(res){
			console.log("And I made it back to the frontend!");
			return res.data;
		});
	}
	return {
		startNewGame: startNewGame
	}
})