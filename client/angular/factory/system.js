angular.module('rosterApp').factory('systemFactory',['$http','$q',function ($http,$q) {

    // Prepping the global scope for the total team salary

    var totalCap = 175; var squad = [];

    return{

        /* Generates a new player from the server maintaining the constraints defined in the requirement document
         Returns the newly created player object if successful
         */

        generatePlayer : function () {
            var deferred = $q.defer();
            if(squad.length > 15){
                deferred.reject(new Error('Cannot have more than 15 players on the team'));
            }else{
                $http.get('/generatePlayer')
                    .then(function (response) {
                        if(response.data.success){
                            var player = response.data.player;
                            deferred.resolve(player);
                        }else{
                            deferred.reject(new Error(response.data.message || 'Error while generating a new player'));
                        }
                    },function (err) {
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        },

        /* Adds the selected player to the squad, also checks if the salary for the player does not exceed the total salary cap or
         the remaining salary cap from the total
         */

        addToSquad : function (player) {
            var deferred = $q.defer();
            var reducer = { salary : 0 };
            if(squad.length > 0){
                reducer = squad.reduce(function (total,num) {
                    return {salary :  total.salary + num.salary}
                });
            }
            if(player.salary > 175){
                deferred.reject(new Error('Player salary cannot be more than 175'));
            }
            else if(totalCap - reducer.salary - player.salary < 0){
                deferred.reject(new Error('Please enter a amount not more than '+ (totalCap - reducer.salary)));
            }
            else{
                deferred.resolve();
                squad.push(player);
            }
            return deferred.promise;
        },

        /*
         Auto generates a squad of 15 members
         */

        autoGenerateSquad : function () {
            var deferred = $q.defer();
            $http.get('/generateSquad')
                .then(function (response) {
                    if(response.data.success){
                        squad = [];
                        squad = response.data.squad;
                        deferred.resolve(squad);
                    }else{
                        deferred.reject(new Error(response.data.message || 'Error while generating a new squad'));
                    }
                },function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },

        // Returns all the players in the team

        listAllPlayers : function () {
            squad = _.sortBy(squad,function (num) {
                return -num.total;
            });
            return squad;
        },

        // Returns substitutes for the team

        ListSubstitutes : function () {
            squad = _.sortBy(squad,function (num) {
                return -num.total;
            });
            return(squad.slice(10,squad.length+1));
        }
    }
}]);