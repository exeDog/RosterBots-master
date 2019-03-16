describe('Controllers',function () {


    beforeEach(angular.mock.module('rosterApp'));

    var systemFactoryMock,q,deferred;

    var stub = {
        name : 'Priyank',
        strength : 30,
        speed : 25,
        agility : 30,
        total : 85
    };

    var stubList = [
        {name:'player1',speed :30,strength:25,agility:20,total:90},
        {name:'player2',speed :20,strength:25,agility:20,total:65},
        {name:'player3',speed :30,strength:15,agility:10,total:55},
        {name:'player4',speed :30,strength:15,agility:30,total:75},
        {name:'player5',speed :30,strength:25,agility:30,total:85}
    ]

    systemFactoryMock = {
        generatePlayer : function () {
            deferred = q.defer();
            return deferred.promise;
        },

        addToSquad : function () {
            deferred = q.defer();
            return deferred.promise;
        },

        listAllPlayers :  function () {
            return;
        },

        ListSubstitutes : function () {
            return;
        }
    };


    describe('Testing PlayerCtrl',function () {

        var scope,ctrl;

        beforeEach(inject(function ($controller,$rootScope,$q) {
            scope = $rootScope.$new();
            q = $q;
            ctrl = $controller('playerCtrl',{$scope:scope,systemFactory:systemFactoryMock});
        }));

        it('Should be present',function () {
            expect(scope).toBeDefined();
        });

        describe('Scope of showMessage should be false',function () {

            it('should be false',function () {
                expect(scope.showMessage).toBeFalsy();
            });
        });

        describe('It should generate a new player for the squad',function () {

            it('Should call the getPlayer method from the system service',function () {
                spyOn(systemFactoryMock,'generatePlayer').and.callThrough();
                scope.generatePlayer();
                expect(systemFactoryMock.generatePlayer).toHaveBeenCalled();
            });

            it('Should return a newly created player',function () {
                scope.generatePlayer();
                expect(scope.player).not.toBe(undefined);
            });

            it('Should have the correct response on creation',function () {
                scope.generatePlayer();
                deferred.resolve(stub);
                scope.$root.$digest();
                expect(scope.player).toBe(stub);
            });

            it('Should only show the form if player is generated successfully',function () {
                expect(scope.showForm).toBeFalsy();
                expect(scope.hideTopButton).toBeFalsy();
            });

            it('Should not have any notification by default',function () {
                expect(scope.message).toEqual('');
            });

            it('Should add the player to the squad',function () {
                spyOn(systemFactoryMock,'addToSquad').and.callThrough();
                scope.addToSquad();
                expect(systemFactoryMock.addToSquad).toHaveBeenCalled();
            });
        });
    });

    describe('LineupCtrl',function () {

        var scope,ctrl;

        beforeEach(inject(function ($controller,$rootScope,$q) {
            scope = $rootScope.$new();
            $q = q;
            ctrl = $controller('lineupCtrl',{$scope:scope,systemFactory:systemFactoryMock});
        }));

        it('Should be present',function () {
            expect(scope).toBeDefined();
        });

        it('Should call the listAllPlayers method from the systemFactory',function () {
            spyOn(systemFactoryMock,'listAllPlayers').and.callThrough();
            scope.roster();
            expect(systemFactoryMock.listAllPlayers).toHaveBeenCalled();
        });

        it('Should list out all the players',function () {
            spyOn(systemFactoryMock,'listAllPlayers').and.returnValue(stubList);
            scope.roster();
            expect(scope.players).toBe(stubList);
        });

        it('Should add 5 players to the substitute list',function () {
            spyOn(systemFactoryMock,'ListSubstitutes').and.returnValue(stubList);
            scope.roster();
            expect(scope.substitutes.length).toBeLessThanOrEqual(5);
        });
    });
});