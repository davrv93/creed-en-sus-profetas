angular.module('starter').controller('CommentaryVerseCtrl', function ($scope, $sce, $state, $ionicModal, $ionicScrollDelegate, $http, ionicToast, $cordovaClipboard, $filter, API_READER, $stateParams, $translate, $rootScope, $cordovaSocialSharing, $location) {
  var $translateFilter = $filter('translate');

  $scope.conditionPlayer = false;
  $scope.searchMode = false;
  $scope.headerTitle = $translateFilter('hashtag');
  $scope.filter = {
    "data_clean": ''
  };

  $scope.goContent = function (param) {
    $state.transitionTo('app.reader_bible.content', {
      verse: param
    });
  }

  $rootScope.change_language = function (locale) {
    $scope.list_underline = [];
    $translate.use(locale);
    localStorage.language = locale;
    $scope.onListReading();
  };

  $scope.getDate = function () {
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

    return year + '-' + month + '-' + day;

  }

  $scope.onListReading = function () {
    $rootScope.progress = true;

    var param_date = $scope.getDate();

    var data = {
      language: $translate.use(),
      date: param_date,
      micro: 'reading'
    }

    console.log('moment', param_date)

    API_READER.BibleReading.get(data).$promise.then(function (success) {
      $scope.bible = success;
      $scope.chapter = success.chapter;
      console.log(success, 'success')
      // Do whatever when the request is finished
    });
  }
  $scope.onListReading();


  $scope.trustSrc = function (src) {
    return $sce.trustAsResourceUrl(src);
  }

});
