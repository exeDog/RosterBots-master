// Dependency injections

var express = require("express");

// Model for Players, Roster & LineUp

var players = require('../models/players');
// roster = require('../models/ro'),
// lineUp = __dirname+'/../models/LineUp';


// The express module will take care of serving the static files, partial views, static routes and handle the requests and response to the server

module.exports =  function (app) {

    // Setting up the variables for configuring the static routes

    var rootDir = __dirname+'/../..',
        viewDir = __dirname+'/../views';

    // Define the static  routes

    //  Angular, CSS & Images
    app.use(express.static(rootDir + '/client'));
    app.use('/node_modules',express.static(rootDir+'/node_modules'));
    app.use('/css',express.static(viewDir + '/css'));
    app.use('/images',express.static(viewDir + '/images'));


    // Handling the first request to the server when the server runs

    app.get('/', function(req, res) {
        res.render('index');
    });

    // Request handling for different views on the SPA

    app.get('/partials/:partialPath', function(req, res) {
        res.render('partials/' + req.params.partialPath);
    });

    // Generate a new player

    app.get('/generatePlayer',function (req,res) {
        players.generatePlayer(function (err,player) {
            if(err){
                res.send({'success':false});
            }
            else{
                res.send({'success':true,'player':player});
            }
        });
    });

    // Generate a squad

    app.get('/generateSquad',function (req,res) {
        players.generateSquad(function (err,squad) {
            if(err){
                res.send({success:false});
            }
            else{
                res.send({'success':true,'squad':squad});
            }
        });
    });

};