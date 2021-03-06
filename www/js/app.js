// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic', 'ionic-toast', 'ngResource', // inject the Ionic framework
    'pascalprecht.translate', 'ngCordova', 'ngAria', 'oc.lazyLoad'
  ])

  .run(function ($rootScope, $ionicPlatform, $cordovaSQLite, $http) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

      $rootScope.progress = true;
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }


      cordova.getAppVersion(function (version) {

        if (localStorage.appVersion === undefined) {
          localStorage.appVersion = version;
        } else {
          localStorage.appVersion = version;
        }
      });

    });
  })



  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("top"); //Places them at the bottom for all OS
    // $ionicConfigProvider.views.maxCache(0);

  })

  .config(function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.useXDomain = true;
  })


  .config(function ($httpProvider) {
    $httpProvider.useApplyAsync(true);
  })

  .config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  })



  .config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/);
  })

  .config(['$translateProvider', '$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'translate/{part}/{lang}.json'
    });

    console.log(localStorage.language)

    if (localStorage.language != undefined) {
      $translateProvider.preferredLanguage(localStorage.language);
    } else {
      $translateProvider.preferredLanguage('ES');
    }
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useSanitizeValueStrategy('escape');

  }])

  .config(["$ocLazyLoadProvider", function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      // options
      'debug': true, // For debugging 'true/false'
    });
  }]);



app.filter('safeHtml', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(val);
  };
});
