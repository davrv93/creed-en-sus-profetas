"use strict"; // <-- add it here
(function() {
    "use strict";

    app.controller('HomeCtrl', function($scope, $http, $rootScope, $filter, $translate, $mdDialog, $stateParams, $mdMedia, $mdToast) {
        if (localStorage.appVersion != undefined) {
            $rootScope.appVersion = localStorage.appVersion
        }

        $scope.wrapper = ['testing'];
        $scope.labels=[];
        var $translateFilter = $filter('translate');
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.label_reavivados= $translateFilter('reavivados');
        $scope.label_espiritu_profecia= $translateFilter('espiritu_profecia');
        $scope.labels.push($scope.label_reavivados);
        $scope.labels.push($scope.label_espiritu_profecia);

        $scope.toastPosition = angular.extend({}, last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;

            last = angular.extend({}, current);
        }

        $scope.showActionToast = function() {
            var pinTo = $scope.getToastPosition();
            var toast = $mdToast.simple()
                .textContent($translateFilter('home_msg'))
                .action($translateFilter('cerrar'))
                .highlightAction(true)
                .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
                .position(pinTo).hideDelay(0);

            $mdToast.show(toast).then(function(response) {
                if (response == 'ok') {

                }
            });
        };

        $scope.closeToast = function() {
            $mdToast.hide();
            console.log('cerrar')
        };


        $scope.showConfirm = function() {
            if (localStorage.language === undefined) {
                var confirm = $mdDialog.confirm()
                    .title('Idioma de la aplicación / App language')
                    .textContent('Elija el idioma que desea para la aplicación\r\n / Choose the desired app language.')
                    .ariaLabel('Title')
                    .targetEvent(event)
                    .ok('ENGLISH')
                    .cancel('ESPAÑOL');
                $mdDialog.show(confirm).then(function() {
                    localStorage.language = "EN";
                    $translate.use(localStorage.language);
                    console.log(localStorage.language);

                }, function() {
                    localStorage.language = "ES";
                    $translate.use(localStorage.language);
                    console.log(localStorage.language);

                });
            } else {
                $translate.use(localStorage.language);
                console.log(localStorage.language);
            }

        };

        $scope.$mdMedia = $mdMedia;
        //console.log($scope.$mdMedia);

        $rootScope.change_language = function(locale) {
            console.log('locale', locale)
            $translate.use(locale);
            localStorage.language = locale;
        }

        $scope.verifyUpdate = function(content, ev) {z
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

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'apps/home/view/update.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

    });

}());