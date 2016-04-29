'use strict';

$(document).ready(function(){
    $('.button-collapse').sideNav();
});

var app = angular.module("myApp",["ui.router"]);

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state("home",{
    url:"/",
    templateUrl:"/partials/home.html",
    controller:"mainCtrl"
  })
.state("admin",{
    url:"/admin",
    templateUrl:"/partials/admin.html",
    controller:"adminCtrl"
  })

$urlRouterProvider.otherwise("/");

});
