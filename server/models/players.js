// Dependency Injection

var async = require('async'),
    uuid  = require('uuidv4'),
    _     = require('lodash');

//  Creating global objects

var player = {},
    listOfPlayers = [];

/*
 This function will generate a new player with the following properties :

 1. Player Name
 2. Player Strength
 3. Player Speed
 4. Player Agility

 It will also check the following constraints

 1. The player name is a sequence specified in the requirement document
 2. The player name is unique across the squad
 3. The player's total stats should not exceed 100 pts
 4. The player's total stats should be unique across the squad
 */

var generatePlayer = function (callback) {
    player = {};
    async.series([generateName,
        generateStats,
        validatePlayers
    ],function (err) {
        if(err){
            return callback(err);
        }
        return callback(null,player);

    });

}

// Will generate a unique sequential name as specified in the requirement document

function generateName(callback) {
    var randomSequence = uuid();
    var letters =[],numbers = [];
    for (var i = 0; i < randomSequence.length; i++) {
        var char = randomSequence.charAt(i);
        if(char !== '-'){
            if(isNaN(char)){
                letters.push(char.toUpperCase());
            }else{
                numbers.push(char);
            }
        }
    }
    letters.sort();numbers.sort();
    letters = letters.concat(numbers).join("");
    player.name = letters;
    return callback();
}

// Will generate unique stats for each player not exceeding 100

function generateStats(callback) {

    /* generate stats for speed strength agility
     cannot exceed 100 pts
     two players cannot have the same total stats score */

    player.strength = _.random(15,34),
        player.speed = _.random(15,33),
        player.agility = _.random(15,33);
    player.total = player.agility + player.speed + player.strength;

    return callback();
}

// Will validate that the player name or total stats are unique across the squad

function validatePlayers(callback) {
    if(_.find(listOfPlayers,function (playerData) {
            return playerData.name == player.name || playerData.total == player.total
        })!== undefined){
        generatePlayer(callback);
    }
    else{
        return callback();
    }
}

/*
 This function will generate a new team of 15 players keeping all the constraints in place
 */

var generateSquad = function (callback) {
    listOfPlayers = [];
    async.times(15,function (iteration,next) {
        generatePlayer(function (err,player) {
            listOfPlayers.push(player);
            next(err,player);
        });
    },function (err) {
        return err ? callback(err) : callback(null,listOfPlayers) ;
    });
};

module.exports.generatePlayer = generatePlayer;
module.exports.generateSquad = generateSquad;