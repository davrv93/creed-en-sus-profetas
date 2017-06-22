// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic','ngResource',               // inject the Ionic framework
  'pascalprecht.translate', 'ngCordova','ngAria','ngMaterial','ngServices',
  'ngOnload',
  'ngMdIcons'])

.run(function($rootScope, $ionicPlatform,  $http) {
    $ionicPlatform.ready(function() {
        //$cordovaSQLite,
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
                  var req = {
                          method: 'GET',
                          url: "https://davrv93.pythonanywhere.com/api/believe/application/status/",
                          params:{language: $translate.use(), version:$rootScope.appVersion}
                      }

                      $http(req).success(function(res) {
                          $scope.content=res;

                      }).error(function(err){
                          console.log('Err',err)
                          $scope.obj_reading =  [{'data':$translateFilter('errors.404')}];
                          $scope.pageTitle="Error";
                      })
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
