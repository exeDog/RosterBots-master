describe('System Factory',function () {

    beforeEach(angular.mock.module('rosterApp'));

    var systemFactory,$httpBackend,q,deferred;

    beforeEach(inject(function (_$httpBackend_,_systemFactory_,$q) {
        $httpBackend = _$httpBackend_;
        systemFactory = _systemFactory_;
        q = $q;
        deferred = q.defer();
    }));

    describe('generatePlayer',function () {

        it('Should generate a new player',function () {
            $httpBackend.expectGET('/generatePlayer').respond(200,{'success':true,'player':{}});

            var generatedPlayer = systemFactory.generatePlayer();
            $httpBackend.flush();
            expect(generatedPlayer).not.toBe(null);

        });
    });

    describe('addToSquad',function () {

        it('Should add the player to the squad',function () {
            spyOn(systemFactory,'addToSquad').and.returnValue(deferred.promise);
            var player = {name:'Priyank',speed:30,agility:30,strength:30,salary:50};
            systemFactory.addToSquad(player);
            deferred.resolve();
            expect(systemFactory.addToSquad).toHaveBeenCalled();
            expect(systemFactory.addToSquad).toBeDefined();
        });
    });

    describe('listAllPlayers',function () {

        it('Should return list of all the players',function () {
            var squad = ['player1','player2','player3'];
            spyOn(systemFactory,'listAllPlayers').and.returnValue(squad);
            var result = systemFactory.listAllPlayers();
            expect(result).toBe(squad);
        });
    });



});