app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "apps/home/view/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "apps/home/view/search.html"
        }
      }
    })

    .state('app.locale', {
      url: "/locale",
      views: {
        'menuContent' :{
          templateUrl: "apps/home/view/locale.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "apps/home/view/browse.html"
        }
      }
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "apps/home/view/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "apps/home/view/settings.html"
        }
      }
    })
    .state('app.settings_locale', {
      url: "/settings_locale",
       views: {
        'menuContent' :{
          templateUrl: "apps/home/view/locale.html",
          controller: 'LocaleCtrl'
        }
      }
    })
    // .state('app.single', {
    //   url: "/playlists/:playlistId",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "apps/home/view/playlist.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // })
    .state('app.reader_bible', {
      url: "/reader_bible",
      views: {
        'menuContent' :{
          templateUrl: "apps/reader/view/reader_bible.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});