angular.module('starter').config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.icon('ion-chevron-left');
  $ionicConfigProvider.backButton.text('')

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "apps/menu/view/menu.html",
      controller: 'MenuCtrl',
      resolve: {
        translatePartialLoader: function loadPartialLoader($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('menu');
          $translate.use()
          return $translate.refresh();
        },
        MenuCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(
            "apps/menu/controller/menu.js"
          );
        }]
      }
    }).state('app.home', {
      url: '/home',
      views: {
        'content': {
          templateUrl: 'apps/home/view/home.html',
          controller: 'HomeCtrl'
        }
      },
      resolve: {
        translatePartialLoader: function loadPartialLoader($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('home');
          $translate.use()
          return $translate.refresh();
        },
        tabBible: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: "tabBible",
            serie: true,
            files: [
              "apps/home/language/factory.js",
              "apps/home/controller/home.js"
            ]
          });
        }]

      }
    })
    .state('app.about', {
      url: "/about",
      views: {
        'content': {
          templateUrl: "apps/about/view/about.html"
        }
      },
      resolve: {
        translatePartialLoader: function loadPartialLoader($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('about');
          $translate.use()
          return $translate.refresh();
        },
        tabBible: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
              name: "about",
              serie: true,
              files: ["apps/about/controller/about.js"]
            }

          ); // Resolve promise and load before view 
        }]
      }
    })
    .state('app.help', {
      url: "/help",
      views: {
        'content': {
          templateUrl: "apps/help/view/help.html"
        }
      },
      resolve: {
        translatePartialLoader: function loadPartialLoader($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('help');
          $translate.use()
          return $translate.refresh();
        },

      }
    }).state('app.reader_spirit_prophecy', {
      url: "/reader_spirit_prophecy",
      views: {
        'content': {
          templateUrl: "apps/reader/view/reader_spirit_prophecy.html"
        }
      }
    }).state('app.reader_bible', {
      parent: 'app',
      url: "/reader_bible",
      views: {
        'content': {
          templateUrl: "apps/reader/view/reader_bible.html"
        }
      },
    })
    .state('app.reader_bible.tab_bible', {
      url: "/tab_bible",
      cache: false,
      views: {
        'tabBible': {
          templateUrl: "apps/reader_bible/view/reader_bible.html",
          controller: "ReaderCtrl"
        }
      },
      resolve: {
        translatePartialLoader: function loadPartialLoader($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('tab_bible');
          $translate.use()
          return $translate.refresh();
        },

        tabBible: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
              name: "tabBible",
              serie: true,
              files: ["lib/react/dist/react.js",
                "lib/react/dist/react-dom.js",
                "lib/react/dist/prop-types.js",
                "lib/react/dist/resize-observer-polyfill.js",
                "lib/react-responsive-audio-player/dist/audioplayer.css",
                "lib/react-responsive-audio-player/dist/audioplayer.js",
                "apps/reader/service/api.js",
                "apps/reader_bible/controller/reader_bible.js"
              ]
            }

          ); // Resolve promise and load before view 
        }]
      }
    })
  /* .state('app.reader_bible.tab_commentary', {
        url: "/tab_commentary",
        cache: false,
        views: {
          'tabCommentary': {
            templateUrl: "apps/reader/view/tab-commentary.html",
            controller: "CommentaryVerseCtrl"
          }
        },
        resolve: {
          tabCommentary: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              "apps/reader/controller/commentary_verse.js"
            ); // Resolve promise and load before view 
          }]
        }
      }); */

  $urlRouterProvider.otherwise('/app/home');
});
