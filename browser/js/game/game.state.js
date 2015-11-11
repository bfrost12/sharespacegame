app.config(function($stateProvider){
	$stateProvider.state('play', {
		url: '/play',
		templateUrl: 'js/game/game.html',
		resolve: {
			game: function(GameFactory) {
				var testSettings = {
					"leader": {
						"name": "Bryce",
						"score": 50,
						"id": "808f-59fe-4428"
					},
					"maxPlayers": 5,
					"numRounds": 4
				}
				return GameFactory.startNewGame(testSettings);
			}
		},
		controller: 'GameController'
	})
	.state('play2', {
		url: '/play2',
		templateUrl: 'js/game/game2.html',
		resolve: {
			game: function(GameFactory) {
				var testSettings = {
					"leader": {
						"name": "Bryce",
						"score": 50,
						"id": "808f-59fe-4428"
					},
					"maxPlayers": 5,
					"numRounds": 4
				}
				return GameFactory.startNewGame(testSettings);
			}
		},
		controller: 'GameController'
	});
});