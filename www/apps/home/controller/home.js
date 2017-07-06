"use strict"; // <-- add it here
(function() {
    "use strict";

    app.controller('HomeCtrl', function($scope, $http, $rootScope, ionicToast, $filter, $translate, $stateParams) {
        if (localStorage.appVersion != undefined) {
            $rootScope.appVersion = localStorage.appVersion
        }

        // $scope.wrapper = ['testing'];
        $scope.labels = [];
        var $translateFilter = $filter('translate');

        // $scope.label_reavivados = $translateFilter('reavivados');
        // $scope.label_espiritu_profecia = $translateFilter('espiritu_profecia');
        // $scope.labels.push($scope.label_reavivados);
        // $scope.labels.push($scope.label_espiritu_profecia);

        $scope.showActionToast = function() {
            ionicToast.show($translateFilter('home_msg'), 'bottom', false, 4000);
        };

        $scope.closeToast = function() {
            ionicToast.hide();
        };



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
        $scope.showConfirm = function() {
            if (localStorage.language === undefined) {
                $scope.dialogLangShown = !$scope.dialogLangShown;

            } else {
                $translate.use(localStorage.language);
                console.log(localStorage.language);
            }

        };

        $rootScope.change_language = function(locale) {
            console.log('locale', locale)
            $translate.use(locale);
            localStorage.language = locale;
        }

        $scope.verifyUpdate = function(content, ev) {
            var actual = $rootScope.appVersion;
            var servidor = content['version'];
            if (actual < servidor) {
                $rootScope.need_update = {
                    'condition': true,
                    'version': content['version'],
                    'content': content['content'],
                    'actual': actual,
                    'servidor': servidor,
                    'title': $translateFilter('update_msg')
                }
                $scope.showAdvanced(ev);

            } else {
                console.log(ev)
                $rootScope.need_update = {
                    'condition': false,
                    'actual': actual,
                    'servidor': servidor,
                    'title': $translateFilter('updated_msg')
                }
                if (ev != undefined) {
                    $scope.showAdvanced(ev);

                }
            }
        }


        $scope.onListUpdate = function(ev) {
            var req = {
                method: 'GET',
                url: "https://davrv93.pythonanywhere.com/api/believe/application/status/",
                params: {
                    language: $translate.use(),
                    version: $rootScope.appVersion
                }
            }

            $http(req).success(function(res) {
                $scope.content = res;
                $scope.verifyUpdate($scope.content, ev);

            }).error(function(err) {
                console.log('Err', err)
                $scope.obj_reading = [{
                    'data': $translateFilter('errors.404')
                }];
                $scope.pageTitle = "Error";
            })
        };

        $scope.closeModal = function() {
            $scope.dialogShown = false;
        }

        $scope.showAdvanced = function(ev) {
            $scope.dialogShown = !$scope.dialogShown;
        };

    });

}());
