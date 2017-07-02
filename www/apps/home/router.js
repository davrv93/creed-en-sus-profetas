app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon('ion-chevron-left');
    $ionicConfigProvider.backButton.text('')


    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "apps/home/view/menu.html"
    })

    .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "apps/home/view/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "apps/home/view/settings.html"
                }
            }
        })
        .state('app.settings_locale', {
            url: "/settings_locale",
            views: {
                'menuContent': {
                    templateUrl: "apps/home/view/locale.html",
                    controller: 'LocaleCtrl'
                }
            }
        })
        .state('app.reader_spirit_prophecy', {
            url: "/reader_spirit_prophecy",
            views: {
                'menuContent': {
                    templateUrl: "apps/reader/view/reader_spirit_prophecy.html"
                }
            }
        })
        .state('app.bible', {
            url: "/bible",
            views: {
                'menuContent': {
                    templateUrl: "apps/reader/view/bible.html"
                }
            }
        })        
        .state('app.reader_bible', {
            url: "/reader_bible",
            views: {
                'menuContent': {
                    templateUrl: "apps/reader/view/reader_bible.html"
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});