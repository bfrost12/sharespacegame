app.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/create-player/createplayer.html',
		controller: 'LoginCtrl'
	})
});

app.controller('LoginCtrl', function ($scope, $http, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('play');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});