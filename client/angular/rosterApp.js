// Bootstrapping the angular application

var rosterApp = angular.module('rosterApp',['ngRoute','ngResource']);

// Configuring the angular routes

rosterApp.config(['$routeProvider','$interpolateProvider',function($routeProvider,$interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $routeProvider
        .when('/',{templateUrl:'/partials/main', controller:'mainCtrl'})
        .when('/players',{templateUrl:'/partials/players',controller:'playerCtrl'})
        .when('/roster',{templateUrl:'/partials/roster',controller:'lineupCtrl'})
        .when('/lineup',{templateUrl:'/partials/lineup',controller:'lineupCtrl'})
}]);
