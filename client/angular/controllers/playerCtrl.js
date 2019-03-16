angular.module('rosterApp').controller('playerCtrl',['$scope','systemFactory','$timeout','$location',function ($scope,systemFactory,$timeout,$location) {

    // Prepping scope variables

    $scope.showMessage = false; $scope.message='';

    // This function will generate a random player for the user within the required parameters

    $scope.generatePlayer = function () {
        $scope.player = {};
        systemFactory.generatePlayer()
            .then(function (response) {
                    $scope.player = response;
                    toggleView();
                },
                function (error) {
                    showNotification(error);
                });
    };

    // Adds the player to the squad that is stored in the system factory

    $scope.addToSquad = function () {
        systemFactory.addToSquad($scope.player)
            .then(function () {
                showNotification();
            },function (error) {
                showNotification(error);
            });
    };

    // Generates a squad of 15 members

    $scope.generateSquad = function () {
        systemFactory.autoGenerateSquad()
            .then(function() {
                $location.path('/roster');
            },function (error) {
                showNotification(error);
            });
    };

    // This function toggles the view to show the form only when the user clicks on the generate a player button

    function toggleView() {
        $scope.showForm = true; $scope.hideTopButton = true;
    }

    // Function for displaying the success or error based off the response from addToSquad function

    function showNotification(error) {
        $scope.showMessage = true;
        if(error){
            $scope.message = error.message;
        }
        else{
            $scope.message = 'Player Added To Squad';
        }
        $timeout(function () {
            $scope.showMessage = false;
            $scope.generatePlayer();
        },500);
    }

}]);