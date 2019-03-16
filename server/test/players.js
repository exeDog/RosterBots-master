var chai = require('chai'),
    players = require('../models/players');

describe('GeneratePlayers',function () {

    it('Should be return an object',function () {

        var result = players.generatePlayer(function (err,player) {
            if(err){
                chai.assert.isNotNull(err);
                chai.assert.isObject(err);
            }
            else{
                chai.assert.isNotNull(player);
                chai.assert.isObject(player);
            }
        });
    });
});
