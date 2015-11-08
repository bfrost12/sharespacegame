app.config(function($stateProvider){
	$stateProvider.state('play', {
		url: '/play',
		templateUrl: 'js/game/game.html',
		resolve: {
			game: function(GameFactory) {
				var testSettings = {
					"leader": "fakePlayerID",
					"maxPlayers": 5,
					"numRounds": 4
				}
				return GameFactory.startNewGame(testSettings);
			}
		},
		controller: function($scope, game, GameFactory) {
			$scope.game = game;
		}
	})
})