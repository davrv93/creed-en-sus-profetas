"use strict"; // <-- add it here
(function () {

  app.controller('HomeCtrl', function ($scope, $http, $rootScope, ionicToast, $filter, $translate, $stateParams, LanguageModal) {

    if (localStorage.appVersion != undefined) {
      $rootScope.appVersion = localStorage.appVersion
    }
    $rootScope.notifyImg = "resources/apps/home/bell.png";
    var $translateFilter = $filter('translate');

    $scope.openLanguageModal = function () {
      LanguageModal.open();
    };

    $scope.showActionToast = function () {
      ionicToast.show($translateFilter('home_msg'), 'bottom', false, 4000);
    };

    $scope.closeToast = function () {
      ionicToast.hide();
    };


    $scope.showConfirm = function () {
      if (localStorage.language === undefined) {
        $translate.use(navigator.language.substr(0, 2).toUpperCase());
        $scope.openLanguageModal();

      } else {
        $translate.use(localStorage.language);
      }

    };

    $rootScope.change_language = function (locale) {
      console.log('locale', locale)
      $translate.use(locale);
      localStorage.language = locale;
    }

    $scope.get_date = function(){
      var currentDate = new Date()
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();


      if (day < 10) {
        day = '0' + day
      }

      if (month < 10) {
        month = '0' + month
      }

      var param_date = year + '-' + month + '-' + day;
      return param_date
    }

    $scope.getStatusReading = function () {
      var param_date=$scope.get_date();
      $rootScope.progress = true;
      
      var req = {
        method: 'GET',
        url: "https://davrv93.pythonanywhere.com/api/believe/spirit_prophecy_read/status/",
        params: {
          language: $translate.use(),
          date: param_date
        }
      }
      $http(req).success(function (res) {
        $scope.status_spirit_prophecy = res.count;
      }).error(function (err) {
        console.log('Err', err)
      })
    }

    $scope.getStatusSpiritProphecyReading = function () {
      $rootScope.progress = true;
      var param_date=$scope.get_date();

      var req = {
        method: 'GET',
        url: "https://davrv93.pythonanywhere.com/api/believe/verse/status/",
        params: {
          language: $translate.use(),
          date: param_date
        }
      }
      $http(req).success(function (res) {
        $scope.status_bible = res.count;
        
      }).error(function (err) {
        console.log('Err', err)
      })
    }

    $scope.getStatusReading();

    $scope.getStatusSpiritProphecyReading();

    
  });


}());
