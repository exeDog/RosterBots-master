angular.module('rosterApp').controller('lineupCtrl',['$scope','systemFactory',function ($scope,systemFactory) {


    // This function will get all the players from the system factory

    $scope.roster = function() {
        $scope.players = systemFactory.listAllPlayers();
        $scope.substitutes = systemFactory.ListSubstitutes();
    };
    $scope.roster();

}]);