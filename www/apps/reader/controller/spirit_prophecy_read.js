angular.module('starter').controller('SpiritProphecyReadCtrl', function ($scope, $http, $filter, API_READER, $stateParams, $translate, $rootScope) {

  var $translateFilter = $filter('translate');

  $rootScope.change_language = function (locale) {
    $translate.use(locale);
    localStorage.language = locale;
    $rootScope.progress = true;
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


    var data = {
      start_date: param_date,
      end_date: param_date,
      code_iso: locale
    }

    console.log(data)



    API_READER.SpiritProphecy.get(data).$promise.then(function (success) {
      $scope.reading = success[0];

    });



  }


  $scope.HighLight = function () {
    var elementId = event.srcElement.id;
    var elementHtml = document.getElementById(elementId)
    var BackgroundColorHighlight = "#337BDF";
    var BackgroundColor = "#93B499";
    var HexBackgroundColor = "rgb(51, 123, 223)";

    if (elementHtml.style.backgroundColor === HexBackgroundColor) {
      elementHtml.style.backgroundColor = BackgroundColor;
    } else {
      elementHtml.style.backgroundColor = BackgroundColorHighlight;
    }
  }



  $scope.onListReading = function () {
    $rootScope.progress = true;
    var currentDate = new Date()
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var code_iso = localStorage.language;


    if (day < 10) {
      day = '0' + day
    }

    if (month < 10) {
      month = '0' + month
    }

    var param_date = year + '-' + month + '-' + day;


    var data = {
      start_date: param_date,
      end_date: param_date,
      code_iso: $translate.use()
    }

    console.log(data)



    API_READER.SpiritProphecy.get(data).$promise.then(function (success) {
      $scope.reading = success[0];

    });


  }

  console.log('test')

  $scope.onListReading();


})
