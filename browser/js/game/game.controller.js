app.controller('GameController', function($scope, game, GameFactory) {
			$scope.game = game;
			$scope.deck = game.deck;
			$scope.currentCard = null;
			$scope.currentAnswers = [];
			$scope.round = 0;
			$scope.players = game.players;

			//game functions
			$scope.loadNextCard = function(){
				if ($scope.round === $scope.deck.length) {
					console.log("The Game is Over! No more cards")
					//Replace this with a gameOver() function later!
				}
				else {
					$scope.currentCard = $scope.deck[$scope.round];
					$scope.round++;
				}
			}

			$scope.addPlayer = GameFactory.addPlayer;
		});