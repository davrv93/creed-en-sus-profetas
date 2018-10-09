"use strict";
(function () {

  angular.module('starter').controller('MenuCtrl', function ($rootScope, $translate, ionicToast, $filter) {

    var $translateFilter = $filter('translate');
    $rootScope.change_language = function (locale) {
      $translate.use(locale);
      localStorage.language = locale;
    }

    $rootScope.showActionToast = function () {
      ionicToast.show($translateFilter('home_msg'), 'bottom', false, 4000);
    };

    $rootScope.closeToast = function () {
      ionicToast.hide();
    };

  });
}());
