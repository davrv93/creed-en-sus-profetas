// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic','ngResource',               // inject the Ionic framework
  'pascalprecht.translate', 'ngCordova','ngAria','ngMaterial','ngServices',
  'ngOnload',
  'ngMdIcons'])

.run(function($rootScope, $ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        //$rootScope.aaa = 'abc 123';
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        $rootScope.progress = true;
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        cordova.getAppVersion(function(version) {
                $rootScope.appVersion = version;
                console.log(version);
            });

        // var db = $rootScope.db = $cordovaSQLite.openDB({ name: "my.db", location: "default" });

        // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

  });
})

.config(function ($httpProvider){
    $httpProvider.defaults.xsrfCookieName='csrftoken';
    $httpProvider.defaults.xsrfHeaderName='X-CSRFToken';
    $httpProvider.defaults.useXDomain=true;
})

.config(function($httpProvider){
    $httpProvider.useApplyAsync(true);
})

