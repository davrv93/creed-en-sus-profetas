"use strict"; // <-- add it here
(function() {
    "use strict";

    app.controller('AboutCtrl', function($scope, $http, $rootScope, $filter, $translate, $stateParams) {
        
        var $translateFilter = $filter('translate');

        $scope.setLang = function(lang) {
            if (lang == "ES") {
                localStorage.language = "ES";
                $translate.use(localStorage.language);
                console.log(localStorage.language);

            } else {
                localStorage.language = "EN";
                $translate.use(localStorage.language);
                console.log(localStorage.language);
            }
        }

        $rootScope.change_language = function(locale) {
            console.log('locale', locale)
            $translate.use(locale);
            localStorage.language = locale;
        }

    });

}());
