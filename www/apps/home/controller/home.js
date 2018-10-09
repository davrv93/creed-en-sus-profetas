"use strict"; // <-- add it here
(function () {

  angular.module('starter').controller('HomeCtrl', function ($scope, $rootScope, $filter, $translate, LanguageModal, ionicToast) {

    if (localStorage.appVersion != undefined) {
      $rootScope.appVersion = localStorage.appVersion
    }

    var $translateFilter = $filter('translate');

    $scope.openLanguageModal = function () {
      LanguageModal.open();
    };

    $rootScope.change_language = function (locale) {
      console.log('locale', locale)
      $translate.use(locale);
      localStorage.language = locale;
    }
  });
}());
